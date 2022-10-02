extern crate core;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, log, env, Balance, Gas, near_bindgen, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;

mod utils;

const MAX_MEMBERS_IN_ROOM: u32 = 1000;
const MAX_USER_ROOMS: u32 = 10;
const NEW_ROOM_PRICE: &str = "0.1";

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
    members: Vec<AccountId>,
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

    /**
     * Create new room
     */
    pub fn new_room(&mut self, title: String, media: String, is_public: bool, is_read_only: bool, members: Vec<AccountId>) {
        let owner = env::predecessor_account_id();
        let mut owner_rooms = self.owner_rooms.get(&owner).unwrap();

        if env::attached_deposit() < Contract::convert_to_yocto(NEW_ROOM_PRICE) {
            env::panic_str("Wrong payment amount");
        }
        if members.len() > MAX_MEMBERS_IN_ROOM as usize {
            env::panic_str("You can't add so much room members");
        }
        if owner_rooms.len() >= MAX_USER_ROOMS as usize {
            env::panic_str("You can't create more rooms");
        }

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
            members: members.clone(),
        };
        self.rooms.insert(&room_id, &room);

        // add to owner
        owner_rooms.push(room_id);
        self.owner_rooms.insert(&owner, &owner_rooms);

        // add to user rooms
        if members.len() > 0 {
            for user_address in members.into_iter() {
                let mut user_rooms = self.user_rooms.get(&user_address).unwrap();
                user_rooms.push(room_id);
                self.user_rooms.insert(&user_address, &user_rooms).unwrap();
            }
        }
    }

    /**
     * Add room members
     * only room owner
     */
    pub fn add_room_members(&mut self, room_id: u32, members: Vec<AccountId>) {
        // if members.len() > MAX_MEMBERS_IN_ROOM as usize {
        //     env::panic_str("You can't add so much room members");
        // }
    }

    /**
     * Join public room
     */
    pub fn join_public_room(&mut self, room_id: u32) {}

    /**
     * Leave room
     */
    pub fn leave_room(&mut self, room_id: u32) {}


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
