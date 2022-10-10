use crate::*;

impl Contract {
    pub(crate) fn send_message_validate_spam(&self, account: &AccountId) {
        let user_account = self.users.get(account);
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);

        if user_account.is_some() {
            // Bronze/Gold account: temporary lock after last spam report
            let user_account = user_account.unwrap();

            let mut max_lock_seconds: u64 = 60 * 60;
            let mut lock_seconds: u64 = user_account.spam_counts as u64 * 60;

            if user_account.level > 1 {
                lock_seconds = lock_seconds / 6;
                max_lock_seconds = max_lock_seconds / 6;
            }
            if lock_seconds > max_lock_seconds {
                lock_seconds = max_lock_seconds;
            }

            if user_account.last_spam_report >= env::block_timestamp() - 1_000_000_000 as u64 * lock_seconds {
                env::panic_str("You can't send messages, spam detected. Account temporary locked.");
            }
        } else if spam_count > 10 {
            // Free accounts: up to 10 spam messages to complete lock
            env::panic_str("You can't send messages, spam detected. Upgrade account to avoid complete lock.");
        }
    }


    pub(crate) fn add_room_member_internal(&mut self, members: Vec<AccountId>, room_id: u32, change_room: bool) {
        let mut room = self.rooms.get(&room_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_rooms = self.user_rooms.get(&member_address).unwrap_or(vec![]);
            if !user_rooms.contains(&room.id) {
                user_rooms.push(room.id);
                self.user_rooms.insert(&member_address, &user_rooms);
            }

            if change_room && !room.members.contains(&member_address) {
                if !room.members.contains(&member_address) {
                    room.members.push(member_address.clone());
                }
            }
        }

        if change_room {
            self.rooms.insert(&room.id, &room);
        }
    }

    pub(crate) fn remove_room_member_internal(&mut self, members: Vec<AccountId>, room_id: u32, change_room: bool) {
        let mut room = self.rooms.get(&room_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_rooms = self.user_rooms.get(&member_address).unwrap_or(vec![]);
            let index = user_rooms.iter().position(|inner_id| &room.id == inner_id);
            if index.is_some() {
                user_rooms.remove(index.unwrap());
                self.user_rooms.insert(&member_address, &user_rooms);
            }

            if change_room {
                let member_index = room.members.iter().position(|member| &member_address == member);
                if member_index.is_some() {
                    room.members.remove(member_index.unwrap());
                    self.rooms.insert(&room.id, &room);
                }
            }
        }
    }
}
