use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, log, env, near_bindgen, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;

#[near_bindgen]
#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Room {
    id: u32,
    owner: AccountId,
    title: String,
    media: String,
    is_public: bool,
    is_read_only: bool,
    created_at: Timestamp,
    users: Vec<AccountId>,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    address: AccountId,
    media: String,
    instagram: String,
    telegram: String,
    twitter: String,
    website: String,
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    UserSpamCounts,
    Users,
    Rooms,
    UserRooms,
    OwnerRooms,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    owner_id: AccountId,
    user_spam_counts: LookupMap<AccountId, u32>,
    users: LookupMap<AccountId, User>,
    rooms: LookupMap<u32, Room>,
    user_rooms: LookupMap<AccountId, Vec<u32>>,
    owner_rooms: LookupMap<AccountId, Vec<u32>>,
    rooms_count: u32,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            owner_id: env::predecessor_account_id(),
            user_spam_counts: LookupMap::new(StorageKeys::UserSpamCounts),
            users: LookupMap::new(StorageKeys::Users),
            rooms: LookupMap::new(StorageKeys::Rooms),
            user_rooms: LookupMap::new(StorageKeys::UserRooms),
            owner_rooms: LookupMap::new(StorageKeys::OwnerRooms),
            rooms_count: 0,
        }
    }
}

#[near_bindgen]
impl Contract {
    pub fn get_room_by_id(&self, id: u32) -> Room {
        self.rooms.get(&id).unwrap()
    }

    pub fn new_room(&mut self, title: String, media: String, is_public: bool, is_read_only: bool, users: Vec<AccountId>) {
        self.rooms_count += 1;
        let room = Room {
            id: self.rooms_count,
            owner: env::predecessor_account_id(),
            title,
            media,
            is_public,
            is_read_only,
            created_at: env::block_timestamp(),
            users,
        };
        self.rooms.insert(&self.rooms_count, &room);

        // add to owner

        // add to user rooms
    }
}

// /*
//  * The rest of this file holds the inline tests for the code above
//  * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
//  */
// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[test]
//     fn get_default_greeting() {
//         let contract = Contract::default();
//         // this test did not call set_greeting so should return the default "Hello" greeting
//         assert_eq!(
//             contract.get_greeting(),
//             "Hello".to_string()
//         );
//     }
//
//     #[test]
//     fn set_then_get_greeting() {
//         let mut contract = Contract::default();
//         contract.set_greeting("howdy".to_string());
//         assert_eq!(
//             contract.get_greeting(),
//             "howdy".to_string()
//         );
//     }
// }
