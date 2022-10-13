use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId, env, Balance, near_bindgen, serde_json::json, Timestamp, BorshStorageKey};
use near_sdk::collections::LookupMap;
use near_sdk::json_types::U128;

mod utils;
mod members;

const MAX_MEMBERS_IN_GROUP: u32 = 1000;
const CREATE_GROUP_PRICE: &str = "0.25";
const JOIN_PUBLIC_PRICE: &str = "0.1";

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub enum GroupType {
    Channel,
    Private,
    Public,
}

#[near_bindgen]
#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Group {
    id: u32,
    owner: AccountId,
    title: String,
    image: String,
    url: String,
    group_type: GroupType,
    created_at: Timestamp,
    members: Vec<AccountId>,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    id: AccountId,
    level: u8,
    last_spam_report: Timestamp,
    spam_counts: u32,
    verified: bool, // verified - no locks
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    UserSpamCounts,
    Users,
    Groups,
    UserGroups,
    OwnerGroups,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    user_spam_counts: LookupMap<AccountId, u32>,
    users: LookupMap<AccountId, User>,
    groups: LookupMap<u32, Group>,
    user_groups: LookupMap<AccountId, Vec<u32>>,
    owner_groups: LookupMap<AccountId, Vec<u32>>,
    groups_count: u32,
    messages_count: u128,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            user_spam_counts: LookupMap::new(StorageKeys::UserSpamCounts),
            users: LookupMap::new(StorageKeys::Users),
            groups: LookupMap::new(StorageKeys::Groups),
            user_groups: LookupMap::new(StorageKeys::UserGroups),
            owner_groups: LookupMap::new(StorageKeys::OwnerGroups),
            groups_count: 0,
            messages_count: 0,
        }
    }
}

#[near_bindgen]
impl Contract {
    /**
     * Get count groups
     */
    pub fn get_groups_count(&self) -> u32 {
        self.groups_count
    }

    /**
     * Get count messages
     */
    pub fn get_messages_count(&self) -> U128 {
        self.messages_count.into()
    }

    /**
     * Get Group by ID
     */
    pub fn get_group_by_id(&self, id: u32) -> Group {
        self.groups.get(&id).unwrap()
    }

    /**
     * Get User Info
     */
    pub fn get_user_info(&self, address: AccountId) -> Option<User> {
        self.users.get(&address)
    }

    /**
     * Get owner groups
     */
    pub fn get_owner_groups(&self, account: AccountId) -> Vec<Group> {
        let id_list = self.owner_groups.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|id| self.groups.get(&id).unwrap()).collect()
    }

    /**
     * Get user groups
     */
    pub fn get_user_groups(&self, account: AccountId) -> Vec<Group> {
        let id_list = self.user_groups.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|id| self.groups.get(&id).unwrap()).collect()
    }

    /**
     * Create new group
     */
    #[payable]
    pub fn create_new_group(&mut self, title: String, image: String, url: String, group_type: GroupType, members: Vec<AccountId>) -> u32 {
        let owner = env::predecessor_account_id();
        let mut owner_groups = self.owner_groups.get(&owner).unwrap_or(vec![]);

        if env::attached_deposit() < Contract::convert_to_yocto(CREATE_GROUP_PRICE) {
            env::panic_str("Wrong payment amount");
        }
        if members.len() > MAX_MEMBERS_IN_GROUP as usize {
            env::panic_str("You can't add so much group members");
        }
        if title.len() < 3 as usize || title.len() >= 160 as usize {
            env::panic_str("Wrong group title length");
        }
        let spam_count = self.user_spam_counts.get(&owner).unwrap_or(0);
        if spam_count > 10 {
            env::panic_str("You can't create groups, spam detected");
        }

        self.groups_count += 1;
        let group_id = self.groups_count;

        let group = Group {
            id: group_id,
            owner: owner.clone(),
            title,
            image,
            url,
            group_type,
            created_at: env::block_timestamp(),
            members: members.clone(),
        };
        self.groups.insert(&group_id, &group);

        // add to owner
        owner_groups.push(group_id.clone());
        self.owner_groups.insert(&owner, &owner_groups);

        // add to user groups
        if members.len() > 0 {
            self.add_group_member_internal(members, group_id, false);
        }
        group_id
    }

    /**
     * Edit group
     * (only group owner)
     */
    pub fn edit_group(&mut self, id: u32, title: String, image: String, url: String) {
        let mut group = self.groups.get(&id).unwrap();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        group.title = title;
        group.image = image;
        group.url = url;

        self.groups.insert(&id, &group);
    }

    /**
     * Add group members
     * (only group owner)
     */
    pub fn owner_add_group_members(&mut self, id: u32, members: Vec<AccountId>) {
        let group = self.groups.get(&id).unwrap();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if group.members.len() + members.len() > MAX_MEMBERS_IN_GROUP as usize {
            env::panic_str("Group members limit reached");
        }
        if members.len() == 0 {
            env::panic_str("Please add members");
        }

        self.add_group_member_internal(members, id, true);
    }

    /**
     * Remove group members
     * (only group owner)
     */
    pub fn owner_remove_group_members(&mut self, id: u32, members: Vec<AccountId>) {
        let group = self.groups.get(&id).unwrap();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if members.len() == 0 {
            env::panic_str("Please provide members for removal");
        }

        self.remove_group_member_internal(members, id, true);
    }

    /**
     * Remove group
     * (only group owner)
     */
    pub fn owner_remove_group(&mut self, id: u32, confirm_title: String) {
        let group = self.groups.get(&id).unwrap();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if confirm_title != group.title {
            env::panic_str("Wrong approval for remove");
        }

        self.remove_group_member_internal(group.members, id, false);
        self.groups.remove(&id);
    }

    /**
     * Join public group
     * (each member pay 0.1N to avoid spam)
     */
    #[payable]
    pub fn join_public_group(&mut self, id: u32) {
        let group = self.groups.get(&id).unwrap();
        let member = env::predecessor_account_id();

        if group.group_type != GroupType::Public {
            env::panic_str("Can't join this group");
        }
        if env::attached_deposit() < Contract::convert_to_yocto(JOIN_PUBLIC_PRICE) {
            env::panic_str("Wrong payment amount");
        }
        if group.members.contains(&member) {
            env::panic_str("You already participate in this group");
        }
        if group.members.len() + 1 > MAX_MEMBERS_IN_GROUP as usize {
            env::panic_str("Group members limit reached");
        }

        self.add_group_member_internal(vec![member], id, true);
    }

    /**
     * Leave group
     */
    pub fn leave_group(&mut self, id: u32) {
        let group = self.groups.get(&id).unwrap();
        let member = env::predecessor_account_id();
        if !group.members.contains(&member) {
            env::panic_str("You don't participate in this group");
        }
        if group.owner == member {
            env::panic_str("You can't leave your group");
        }

        self.remove_group_member_internal(vec![member], id, true);
    }

    /**
     * Private Message
     */
    pub fn send_private_message(&mut self, text: String, image: String, to_address: AccountId, reply_message_id: Option<String>) -> U128 {
        let account = env::predecessor_account_id();
        self.send_message_validate_spam(&account);

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
            "image": image.to_string(),
        }).to_string();

        env::log_str(&message[..]);
        self.messages_count.into()
    }

    /**
     * Group Message
     */
    pub fn send_group_message(&mut self, text: String, image: String, group_id: u32, reply_message_id: Option<String>) -> U128 {
        let group = self.groups.get(&group_id).unwrap();
        let account = env::predecessor_account_id();
        self.send_message_validate_spam(&account);

        if group.group_type == GroupType::Channel && group.owner != account {
            env::panic_str("No access to this group");
        }
        if group.group_type == GroupType::Private && group.owner != account {
            if !group.members.contains(&account) {
                env::panic_str("No access to this group");
            }
        }

        // send message
        self.messages_count += 1;
        let message = json!({
            "id": self.messages_count.to_string(),
            "from_user": env::predecessor_account_id().to_string(),
            "group_id": group_id.to_string(),
            "reply_id": reply_message_id.unwrap_or("".to_string()),
            "text": text,
            "image": image.to_string(),
        }).to_string();

        env::log_str(&message[..]);

        self.messages_count.into()
    }

    /**
     * Register user account
     */
    #[payable]
    pub fn create_user_account(&mut self) {
        let account = env::predecessor_account_id();
        if self.users.get(&account).is_some() {
            env::panic_str("Account already exists!");
        }

        let level = Contract::get_level_by_deposit();
        let user_account = User {
            id: account.clone(),
            level,
            last_spam_report: 0,
            spam_counts: 0,
            verified: false,
        };
        self.users.insert(&account, &user_account);
    }

    #[payable]
    pub fn user_account_level_up(&mut self) {
        let account = env::predecessor_account_id();
        let mut user_account = self.users.get(&account).expect("User account not found!");
        let level = Contract::get_level_by_deposit();

        if user_account.level >= level {
            env::panic_str("Not enough deposit to increase account level");
        }

        user_account.level = level;
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

    fn create_group_internal(contract: &mut Contract, title: String, group_type: GroupType, members: Vec<AccountId>) {
        set_context(NEAR_ID, Contract::convert_to_yocto(CREATE_GROUP_PRICE));
        contract.create_new_group(
            title, "".to_string(), "".to_string(), group_type, members,
        );
    }

    #[test]
    fn send_private_message() {
        let mut contract = Contract::default();

        let message_id = contract.send_private_message("Test message".to_string(), "".to_string(), "test.testnet".parse().unwrap(), None);
        assert_eq!(message_id, U128::from(1));
    }

    #[test]
    fn create_private_group() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "Group 1".to_string(), GroupType::Private, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        assert_eq!(contract.get_groups_count(), 1);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.title, "Group 1".to_string());
        assert_eq!(group.members.len(), 2);

        // Check owner groups
        let groups = contract.get_owner_groups(NEAR_ID.parse().unwrap());
        assert_eq!(groups.len(), 1);
    }

    #[test]
    fn edit_group() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "group 1".to_string(), GroupType::Private, vec![]);

        contract.edit_group(
            1, "group updated".to_string(), "".to_string(), "https://someurl.com".to_string(),
        );
        let group = contract.get_group_by_id(1);
        assert_eq!(group.title, "group updated".to_string());
        assert_eq!(group.group_type, GroupType::Private);
    }

    #[test]
    fn create_public_group() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "group".to_string(), GroupType::Public, vec![]);

        assert_eq!(contract.get_groups_count(), 1);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.title, "group".to_string());
        assert_eq!(group.group_type, GroupType::Public);
        assert_eq!(group.members.len(), 0);

        // Add members
        contract.owner_add_group_members(1, vec![
            "m1.testnet".parse().unwrap(),
            "m1.testnet".parse().unwrap(), // duplicate test
            "m2.testnet".parse().unwrap(),
        ]);
        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 2);

        // Remove member
        contract.owner_remove_group_members(1, vec![
            "m1.testnet".parse().unwrap()
        ]);
        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 1);

        // Check user groups
        let no_groups = contract.get_user_groups("m1.testnet".parse().unwrap());
        assert_eq!(no_groups.len(), 0);

        let is_groups = contract.get_user_groups("m2.testnet".parse().unwrap());
        assert_eq!(is_groups.len(), 1);
    }

    #[test]
    fn join_public_group() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "group".to_string(), GroupType::Public, vec![]);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 0);

        // Join public group
        set_context("new.testnet", Contract::convert_to_yocto(JOIN_PUBLIC_PRICE));
        contract.join_public_group(1);

        // Check user groups
        let is_groups = contract.get_user_groups("new.testnet".parse().unwrap());
        assert_eq!(is_groups.len(), 1);

        // Owner add new member
        set_context(NEAR_ID, 0);
        contract.owner_add_group_members(1, vec!["m1.testnet".parse().unwrap()]);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 2);

        // Check user groups
        let is_groups = contract.get_user_groups("m1.testnet".parse().unwrap());
        assert_eq!(is_groups.len(), 1);
    }

    #[test]
    fn send_group_message() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "Private group".to_string(), GroupType::Private, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        // Test owner message
        set_context(NEAR_ID, 0);
        let message_id = contract.send_group_message("Test message 1".to_string(), "".to_string(), 1, None);
        assert_eq!(message_id, U128::from(1));

        // Test member message
        set_context("m1.testnet", 0);
        let message_id = contract.send_group_message("Test message 2".to_string(), "".to_string(), 1, None);
        assert_eq!(message_id, U128::from(2));
    }

    #[test]
    fn leave_group() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "Private group".to_string(), GroupType::Private, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 2);

        set_context("m1.testnet", 0);
        contract.leave_group(1);

        let group = contract.get_group_by_id(1);
        assert_eq!(group.members.len(), 1);

        let no_groups = contract.get_user_groups("m1.testnet".parse().unwrap());
        assert_eq!(no_groups.len(), 0);

        let is_groups = contract.get_user_groups("m2.testnet".parse().unwrap());
        assert_eq!(is_groups.len(), 1);
    }

    #[test]
    #[should_panic(expected = "No access to this group")]
    fn private_group_message_no_access() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "Private group".to_string(), GroupType::Private, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_group_message("Test message 1".to_string(), "".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to this group")]
    fn readonly_group_message_no_access() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "Readonly group".to_string(), GroupType::Channel, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_group_message("Test message 1".to_string(), "".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn remove_group_no_access() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "group".to_string(), GroupType::Private, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.owner_remove_group(1, "group".to_string());
    }

    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn edit_group_no_access() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "My group".to_string(), GroupType::Channel, vec![]);

        set_context("guest.testnet", 0);
        contract.edit_group(
            1, "group updated".to_string(), "".to_string(), "".to_string(),
        );
    }


    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn group_add_members_no_access() {
        let mut contract = Contract::default();
        create_group_internal(&mut contract, "My group".to_string(), GroupType::Public, vec![]);

        set_context("guest.testnet", 0);
        contract.owner_add_group_members(
            1, vec!["some.testnet".parse().unwrap()],
        );
    }
}
