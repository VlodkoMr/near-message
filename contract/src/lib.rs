extern crate core;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, env, Balance, near_bindgen, serde_json::json, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U128;

mod utils;
mod members;

const MAX_MEMBERS_IN_ROOM: u32 = 1000;
const JOIN_PUBLIC_PRICE: &str = "0.1";

#[near_bindgen]
#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Room {
    id: u32,
    owner: AccountId,
    title: String,
    media: String,
    is_private: bool,
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
    messages_count: u128,
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
            messages_count: 0,
        }
    }
}

#[near_bindgen]
impl Contract {
    /**
     * Get count rooms
     */
    pub fn get_rooms_count(&self) -> u32 {
        self.rooms_count
    }

    /**
     * Get count messages
     */
    pub fn get_messages_count(&self) -> U128 {
        self.messages_count.into()
    }

    /**
     * Get Room by ID
     */
    pub fn get_room_by_id(&self, id: u32) -> Room {
        self.rooms.get(&id).unwrap()
    }

    /**
     * Get owner rooms
     */
    pub fn get_owner_rooms(&self, account: AccountId) -> Vec<Room> {
        let id_list = self.owner_rooms.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|room_id| self.rooms.get(&room_id).unwrap()).collect()
    }

    /**
     * Get user rooms
     */
    pub fn get_user_rooms(&self, account: AccountId) -> Vec<Room> {
        let id_list = self.user_rooms.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|room_id| self.rooms.get(&room_id).unwrap()).collect()
    }

    /**
     * Create new room
     */
    #[payable]
    pub fn create_new_room(&mut self, title: String, media: String, is_private: bool, is_read_only: bool, members: Vec<AccountId>) {
        let owner = env::predecessor_account_id();
        let mut owner_rooms = self.owner_rooms.get(&owner).unwrap_or(vec![]);

        if env::attached_deposit() < Contract::convert_to_yocto("0.25") {
            env::panic_str("Wrong payment amount");
        }
        if members.len() > MAX_MEMBERS_IN_ROOM as usize {
            env::panic_str("You can't add so much room members");
        }
        if title.len() < 3 as usize || title.len() >= 160 as usize {
            env::panic_str("Wrong room title length");
        }
        let spam_count = self.user_spam_counts.get(&owner).unwrap_or(0);
        if spam_count > 10 {
            env::panic_str("You can't create rooms, spam detected");
        }

        self.rooms_count += 1;
        let room_id = self.rooms_count;

        let room = Room {
            id: room_id,
            owner: owner.clone(),
            title,
            media,
            is_private,
            is_read_only,
            created_at: env::block_timestamp(),
            members: members.clone(),
        };
        self.rooms.insert(&room_id, &room);

        // add to owner
        owner_rooms.push(room_id.clone());
        self.owner_rooms.insert(&owner, &owner_rooms);

        // add to user rooms
        if members.len() > 0 {
            self.add_room_member_internal(members, room_id, false);
        }
    }

    /**
     * Edit room
     * (only room owner)
     */
    pub fn edit_room(&mut self, room_id: u32, title: String, media: String, is_private: bool, is_read_only: bool) {
        let mut room = self.rooms.get(&room_id).unwrap();
        if room.owner != env::predecessor_account_id() {
            env::panic_str("No access to room modification");
        }
        room.title = title;
        room.media = media;
        room.is_private = is_private;
        room.is_read_only = is_read_only;

        self.rooms.insert(&room_id, &room);
    }

    /**
     * Add room members
     * (only room owner)
     */
    pub fn owner_add_room_members(&mut self, room_id: u32, members: Vec<AccountId>) {
        let room = self.rooms.get(&room_id).unwrap();
        if room.owner != env::predecessor_account_id() {
            env::panic_str("No access to room modification");
        }
        if room.members.len() + members.len() > MAX_MEMBERS_IN_ROOM as usize {
            env::panic_str("Room members limit reached");
        }
        if members.len() == 0 {
            env::panic_str("Please add members");
        }

        self.add_room_member_internal(members, room_id, true);
    }

    /**
     * Remove room members
     * (only room owner)
     */
    pub fn owner_remove_room_members(&mut self, room_id: u32, members: Vec<AccountId>) {
        let room = self.rooms.get(&room_id).unwrap();
        if room.owner != env::predecessor_account_id() {
            env::panic_str("No access to room modification");
        }
        if members.len() == 0 {
            env::panic_str("Please provide members for removal");
        }

        self.remove_room_member_internal(members, room_id, true);
    }

    /**
     * Remove room
     * (only room owner)
     */
    pub fn owner_remove_room(&mut self, room_id: u32, confirm_title: String) {
        let room = self.rooms.get(&room_id).unwrap();
        if room.owner != env::predecessor_account_id() {
            env::panic_str("No access to room modification");
        }
        if confirm_title != room.title {
            env::panic_str("Wrong approval for remove");
        }

        self.remove_room_member_internal(room.members, room_id, false);
        self.rooms.remove(&room_id);
    }

    /**
     * Join public room
     * (each member pay 0.1N to avoid spam)
     */
    #[payable]
    pub fn join_public_room(&mut self, room_id: u32) {
        let room = self.rooms.get(&room_id).unwrap();
        let member = env::predecessor_account_id();

        if room.is_private || room.is_read_only {
            env::panic_str("Can't join this room");
        }
        if env::attached_deposit() < Contract::convert_to_yocto(JOIN_PUBLIC_PRICE) {
            env::panic_str("Wrong payment amount");
        }
        if room.members.contains(&member) {
            env::panic_str("You already participate in this room");
        }
        if room.members.len() + 1 > MAX_MEMBERS_IN_ROOM as usize {
            env::panic_str("Room members limit reached");
        }

        self.add_room_member_internal(vec![member], room_id, true);
    }

    /**
     * Leave room
     */
    pub fn leave_room(&mut self, room_id: u32) {
        let room = self.rooms.get(&room_id).unwrap();
        let member = env::predecessor_account_id();
        if !room.members.contains(&member) {
            env::panic_str("You don't participate in this room");
        }
        if room.owner == member {
            env::panic_str("You can't leave your room");
        }

        self.remove_room_member_internal(vec![member], room_id, true);
    }

    /**
     * Private Message
     */
    pub fn send_private_message(&mut self, text: String, to_user: AccountId, reply_message_id: Option<String>) -> U128 {
        let account = env::predecessor_account_id();
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);
        if spam_count > 10 {
            env::panic_str("You can't send messages, spam detected");
        }
        if to_user == account {
            env::panic_str("Can't send message to yourself");
        }
        if text.len() > 5000 {
            env::panic_str("One message is limited by 5000 characters");
        }

        // send message
        self.messages_count += 1;
        let message = json!({
            "id": self.messages_count.to_string(),
            "from_user": account.to_string(),
            "to_user": to_user.to_string(),
            "reply_id": reply_message_id.unwrap_or("".to_string()),
            "text": text
        }).to_string();

        env::log_str(&message[..]);
        self.messages_count.into()
    }

    /**
     * Group Message
     */
    pub fn send_room_message(&mut self, text: String, to_room: u32, reply_message_id: Option<String>) {
        let room = self.rooms.get(&to_room).unwrap();
        let account = env::predecessor_account_id();
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);
        if spam_count > 10 {
            env::panic_str("You can't send messages, spam detected");
        }
        if room.is_read_only && room.owner != account {
            env::panic_str("No access to this room");
        }
        if room.is_private && room.owner != account {
            if !room.members.contains(&account) {
                env::panic_str("No access to this room");
            }
        }

        // send message
        self.messages_count += 1;
        let message = json!({
            "id": self.messages_count.to_string(),
            "from_user": env::predecessor_account_id().to_string(),
            "to_room": to_room,
            "reply_id": reply_message_id.unwrap_or("".to_string()),
            "text": text
        }).to_string();

        env::log_str(&message[..]);
    }
}

/*
 * Tests
 */
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::testing_env;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::Balance;

    const NEAR_ID: &str = "tester.testnet";

    fn set_context(predecessor: &str, amount: Balance) {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor.parse().unwrap());
        builder.attached_deposit(amount);
        testing_env!(builder.build());
    }

    #[test]
    fn send_private_message() {
        let mut contract = Contract::default();

        let message_id = contract.send_private_message("Test message".to_string(), "test.testnet".parse().unwrap(), None);
        assert_eq!(message_id, U128::from(1));
    }

    #[test]
    fn create_private_room() {
        let mut contract = Contract::default();

        set_context(NEAR_ID, Contract::convert_to_yocto("0.25"));
        let members = vec!["test1".parse().unwrap(), "test2".parse().unwrap()];
        contract.create_new_room(
            "Room 1".to_string(), "https://someurl.com/image.png".to_string(), true, false, members,
        );

        assert_eq!(contract.get_rooms_count(), 1);

        let room1 = contract.get_room_by_id(1);
        assert_eq!(room1.title, "Room 1".to_string());
        assert_eq!(room1.is_private, true);
        assert_eq!(room1.is_read_only, false);
        assert_eq!(room1.members.len(), 2);
    }

    #[test]
    fn create_public_room() {
        let mut contract = Contract::default();

        set_context(NEAR_ID, Contract::convert_to_yocto("0.25"));
        contract.create_new_room(
            "Room 2".to_string(), "".to_string(), false, false, vec![],
        );
        assert_eq!(contract.get_rooms_count(), 1);

        let room2 = contract.get_room_by_id(1);
        assert_eq!(room2.title, "Room 2".to_string());
        assert_eq!(room2.is_private, false);
        assert_eq!(room2.is_read_only, false);
        assert_eq!(room2.members.len(), 0);

        // Add members
        contract.owner_add_room_members(1, vec![
            "m1".parse().unwrap(),
            "m1".parse().unwrap(), // duplicate test
            "m2".parse().unwrap(),
        ]);
        let room2 = contract.get_room_by_id(1);
        assert_eq!(room2.members.len(), 2);
    }
}
