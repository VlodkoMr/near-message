extern crate core;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, env, log, Balance, near_bindgen, serde_json::json, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U128;

mod utils;
mod members;

const MAX_MEMBERS_IN_ROOM: u32 = 1000;
const CREATE_ROOM_PRICE: &str = "0.25";
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
    id: AccountId,
    level: u8,
    media: String,
    instagram: Option<String>,
    telegram: Option<String>,
    twitter: Option<String>,
    website: Option<String>,
    last_spam_report: Timestamp,
    spam_counts: u32,
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
     * Get User Info
     */
    pub fn get_user_info(&self, address: AccountId) -> Option<User> {
        self.users.get(&address)
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
    pub fn create_new_room(&mut self, title: String, media: String, is_private: bool, is_read_only: bool, members: Vec<AccountId>) -> u32 {
        let owner = env::predecessor_account_id();
        let mut owner_rooms = self.owner_rooms.get(&owner).unwrap_or(vec![]);

        if env::attached_deposit() < Contract::convert_to_yocto(CREATE_ROOM_PRICE) {
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
        room_id
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
    pub fn send_private_message(&mut self, text: String, media: String, to_address: AccountId, reply_message_id: Option<String>) -> U128 {
        let account = env::predecessor_account_id();
        let spam_count = self.user_spam_counts.get(&account).unwrap_or(0);
        if spam_count > 10 {
            env::panic_str("You can't send messages, spam detected");
        }
        if to_address == account {
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
            "to_user": to_address.to_string(),
            "reply_id": reply_message_id.unwrap_or("".to_string()),
            "text": text,
            "media": media.to_string(),
        }).to_string();

        env::log_str(&message[..]);
        self.messages_count.into()
    }

    /**
     * Group Message
     */
    pub fn send_room_message(&mut self, text: String, media: String, room_id: u32, reply_message_id: Option<String>) -> U128 {
        let room = self.rooms.get(&room_id).unwrap();
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
            "room_id": room_id.to_string(),
            "reply_id": reply_message_id.unwrap_or("".to_string()),
            "text": text,
            "media": media.to_string(),
        }).to_string();

        env::log_str(&message[..]);

        self.messages_count.into()
    }

    /**
     * Register user account
     */
    #[payable]
    pub fn create_user_account(
        &mut self, media: String, instagram: Option<String>, telegram: Option<String>, twitter: Option<String>, website: Option<String>,
    ) {
        let account = env::predecessor_account_id();
        if self.users.get(&account).is_some() {
            env::panic_str("Account already exists!");
        }

        let level = Contract::get_level_by_deposit();
        let user_account = User {
            id: account.clone(),
            level,
            media,
            instagram: if level > 1 { instagram } else { None },
            telegram: if level > 1 { telegram } else { None },
            twitter: if level > 1 { twitter } else { None },
            website: if level > 1 { website } else { None },
            last_spam_report: 0,
            spam_counts: 0,
        };
        self.users.insert(&account, &user_account);
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

    fn create_room_internal(contract: &mut Contract, title: String, is_private: bool, is_readonly: bool, members: Vec<AccountId>) {
        set_context(NEAR_ID, Contract::convert_to_yocto(CREATE_ROOM_PRICE));
        contract.create_new_room(
            title, "".to_string(), is_private, is_readonly, members,
        );
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
        create_room_internal(&mut contract, "Room 1".to_string(), true, false, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        assert_eq!(contract.get_rooms_count(), 1);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.title, "Room 1".to_string());
        assert_eq!(room.is_private, true);
        assert_eq!(room.is_read_only, false);
        assert_eq!(room.members.len(), 2);

        // Check owner rooms
        let rooms = contract.get_owner_rooms(NEAR_ID.parse().unwrap());
        assert_eq!(rooms.len(), 1);
    }

    #[test]
    fn edit_room() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Room 1".to_string(), true, false, vec![]);

        contract.edit_room(
            1, "Room updated".to_string(), "".to_string(), false, false,
        );
        let room = contract.get_room_by_id(1);
        assert_eq!(room.title, "Room updated".to_string());
        assert_eq!(room.is_private, false);
    }

    #[test]
    fn create_public_room() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Room".to_string(), false, false, vec![]);

        assert_eq!(contract.get_rooms_count(), 1);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.title, "Room".to_string());
        assert_eq!(room.is_private, false);
        assert_eq!(room.is_read_only, false);
        assert_eq!(room.members.len(), 0);

        // Add members
        contract.owner_add_room_members(1, vec![
            "m1.testnet".parse().unwrap(),
            "m1.testnet".parse().unwrap(), // duplicate test
            "m2.testnet".parse().unwrap(),
        ]);
        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 2);

        // Remove member
        contract.owner_remove_room_members(1, vec![
            "m1.testnet".parse().unwrap()
        ]);
        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 1);

        // Check user rooms
        let no_rooms = contract.get_user_rooms("m1.testnet".parse().unwrap());
        assert_eq!(no_rooms.len(), 0);

        let is_rooms = contract.get_user_rooms("m2.testnet".parse().unwrap());
        assert_eq!(is_rooms.len(), 1);
    }

    #[test]
    fn join_public_room() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Room".to_string(), false, false, vec![]);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 0);

        // Join public room
        set_context("new.testnet", Contract::convert_to_yocto(JOIN_PUBLIC_PRICE));
        contract.join_public_room(1);

        // Check user rooms
        let is_rooms = contract.get_user_rooms("new.testnet".parse().unwrap());
        assert_eq!(is_rooms.len(), 1);

        // Owner add new member
        set_context(NEAR_ID, 0);
        contract.owner_add_room_members(1, vec!["m1.testnet".parse().unwrap()]);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 2);

        // Check user rooms
        let is_rooms = contract.get_user_rooms("m1.testnet".parse().unwrap());
        assert_eq!(is_rooms.len(), 1);
    }

    #[test]
    fn send_room_message() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Private room".to_string(), true, false, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        // Test owner message
        set_context(NEAR_ID, 0);
        let message_id = contract.send_room_message("Test message 1".to_string(), 1, None);
        assert_eq!(message_id, U128::from(1));

        // Test member message
        set_context("m1.testnet", 0);
        let message_id = contract.send_room_message("Test message 2".to_string(), 1, None);
        assert_eq!(message_id, U128::from(2));
    }

    #[test]
    fn leave_room() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Private room".to_string(), true, false, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 2);

        set_context("m1.testnet", 0);
        contract.leave_room(1);

        let room = contract.get_room_by_id(1);
        assert_eq!(room.members.len(), 1);

        let no_rooms = contract.get_user_rooms("m1.testnet".parse().unwrap());
        assert_eq!(no_rooms.len(), 0);

        let is_rooms = contract.get_user_rooms("m2.testnet".parse().unwrap());
        assert_eq!(is_rooms.len(), 1);
    }

    #[test]
    #[should_panic(expected = "No access to this room")]
    fn private_room_message_no_access() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Private room".to_string(), true, false, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_room_message("Test message 1".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to this room")]
    fn readonly_room_message_no_access() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Readonly room".to_string(), false, true, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_room_message("Test message 1".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to room modification")]
    fn remove_room_no_access() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "Room".to_string(), false, false, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.owner_remove_room(1, "Room".to_string());
    }

    #[test]
    #[should_panic(expected = "No access to room modification")]
    fn edit_room_no_access() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "My Room".to_string(), false, false, vec![]);

        set_context("guest.testnet", 0);
        contract.edit_room(
            1, "Room updated".to_string(), "".to_string(), false, false,
        );
    }


    #[test]
    #[should_panic(expected = "No access to room modification")]
    fn room_add_members_no_access() {
        let mut contract = Contract::default();
        create_room_internal(&mut contract, "My Room".to_string(), false, false, vec![]);

        set_context("guest.testnet", 0);
        contract.owner_add_room_members(
            1, vec!["some.testnet".parse().unwrap()],
        );
    }
}
