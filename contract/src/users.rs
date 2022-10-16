use crate::*;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub id: AccountId,
    pub level: u8,
    pub last_spam_report: Timestamp,
    pub spam_counts: u32,
    pub verified: bool, // verified - no locks
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum UserVersion {
    V1(User),
}

impl From<UserVersion> for User {
    fn from(version: UserVersion) -> Self {
        match version {
            // UserVersion::V2(v2) => v2,
            UserVersion::V1(v1) => v1
            // {
            //     User {
            //         id: v1.id,
            //         level: v1.level,
            //         last_spam_report: v1.last_spam_report,
            //         spam_counts: v1.spam_counts,
            //         verified: v1.verified,
            //     }
            // }
        }
    }
}

impl From<User> for UserVersion {
    fn from(user: User) -> Self {
        UserVersion::V1(user)
        // UserVersion::V2(user)
    }
}

impl Contract {
    // Validate user account - lock spammers
    pub(crate) fn send_message_validate_spam(&self, account: &AccountId) {
        let user_account = self.users.get(account);
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);

        if user_account.is_some() {
            let user_account: User = user_account.unwrap().into();

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

    pub(crate) fn create_user_internal(&mut self, account: &AccountId, level: u8) {
        let user_account = User {
            id: account.clone(),
            level,
            last_spam_report: 0,
            spam_counts: 0,
            verified: false,
        };
        self.users.insert(&account, &user_account.into());
    }
}
