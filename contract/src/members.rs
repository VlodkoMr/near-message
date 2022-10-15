use crate::*;

impl Contract {
    // Validate user account - lock spammers
    pub(crate) fn send_message_validate_spam(&self, account: &AccountId) {
        let user_account = self.users.get(account);
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);

        if user_account.is_some() {
            let user_account = user_account.unwrap();

            // Bronze/Gold account: temporary lock after last spam report. Verified: no locks
            if !user_account.verified {
                let mut max_lock_seconds: u64 = 60 * 60;
                let mut lock_seconds: u64 = user_account.spam_counts as u64 * 60;

                if user_account.level > 1 {
                    lock_seconds = lock_seconds / 4;
                    max_lock_seconds = max_lock_seconds / 4;
                }
                if lock_seconds > max_lock_seconds {
                    lock_seconds = max_lock_seconds;
                }

                if user_account.last_spam_report >= env::block_timestamp() - 1_000_000_000 as u64 * lock_seconds {
                    env::panic_str("You can't send messages, spam detected. Account temporary locked.");
                }
            }
        } else if spam_count > 10 {
            // Free accounts: up to 10 spam messages to complete lock
            env::panic_str("You can't send messages, spam detected. Upgrade account to avoid complete lock.");
        }
    }

    // Add new members to group
    pub(crate) fn add_group_member_internal(&mut self, members: Vec<AccountId>, group_id: u32, change_group: bool) {
        let mut group = self.groups.get(&group_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_groups = self.user_groups.get(&member_address).unwrap_or(vec![]);
            if !user_groups.contains(&group.id) {
                user_groups.push(group.id);
                self.user_groups.insert(&member_address, &user_groups);
            }

            if change_group && !group.members.contains(&member_address) {
                if !group.members.contains(&member_address) {
                    group.members.push(member_address.clone());
                }
            }
        }

        if change_group {
            self.groups.insert(&group.id, &group);
        }
    }

    // Remove members from group
    pub(crate) fn remove_group_member_internal(&mut self, members: Vec<AccountId>, group_id: u32, change_group: bool) {
        let mut group = self.groups.get(&group_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_groups = self.user_groups.get(&member_address).unwrap_or(vec![]);
            let index = user_groups.iter().position(|inner_id| &group.id == inner_id);
            if index.is_some() {
                user_groups.remove(index.unwrap());
                self.user_groups.insert(&member_address, &user_groups);
            }

            if change_group {
                let member_index = group.members.iter().position(|member| &member_address == member);
                if member_index.is_some() {
                    group.members.remove(member_index.unwrap());
                    self.groups.insert(&group.id, &group);
                }
            }
        }
    }
}
