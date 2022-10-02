extern crate core;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, log, env, Balance, Gas, near_bindgen, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;

mod utils;

const MAX_USERS_IN_ROOM: u32 = 1000;

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
        let owner = env::predecessor_account_id();
        if env::attached_deposit() < Contract::convert_to_yocto("0.1") {
            env::panic_str("Wrong payment amount");
        }
        if users.len() > MAX_USERS_IN_ROOM as usize {
            env::panic_str("You can't add so much room members");
        }

        let mut owner_rooms = self.owner_rooms.get(&owner).unwrap();

        self.rooms_count += 1;
        let room_id = self.rooms_count;

        let room = Room {
            id: room_id,
            owner: owner.clone(),
            title,
            media,
            is_public,
            is_read_only,
            created_at: env::block_timestamp(),
            users: users.clone(),
        };
        self.rooms.insert(&room_id, &room);

        // add to owner
        owner_rooms.push(room_id);
        self.owner_rooms.insert(&owner, &owner_rooms);

        // add to user rooms
        if users.len() > 0 {
            for user_address in users.into_iter() {
                let mut user_rooms = self.user_rooms.get(&user_address).unwrap();
                user_rooms.push(room_id);
                self.user_rooms.insert(&user_address, &user_rooms).unwrap();
            }
        }
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
