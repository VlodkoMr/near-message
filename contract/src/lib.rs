use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    AccountId, env, Balance, near_bindgen, serde_json::json, PanicOnDefault, Timestamp,
    BorshStorageKey, assert_one_yocto,
};
use near_sdk::collections::{LookupMap, UnorderedSet};
use near_sdk::json_types::U128;

pub use crate::users::{User, UserVersion};
pub use crate::groups::{GroupVersion, Group, GroupType};

mod utils;
mod users;
mod groups;

const CREATE_GROUP_PRICE: &str = "0.25";
const JOIN_PUBLIC_PRICE: &str = "0.01";
const JOIN_CHANNEL_PRICE: &str = "0.00001";

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    UserSpamCounts,
    Users,
    Groups,
    UserGroups,
    OwnerGroups,
    PublicGroups,
    PublicChannels,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner: AccountId,
    user_spam_counts: LookupMap<AccountId, u32>,
    users: LookupMap<AccountId, UserVersion>,
    groups: LookupMap<u32, GroupVersion>,
    public_groups: UnorderedSet<u32>,
    public_channels: UnorderedSet<u32>,
    user_groups: LookupMap<AccountId, Vec<u32>>,
    owner_groups: LookupMap<AccountId, Vec<u32>>,
    groups_count: u32,
    messages_count: u128,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn init(owner_id: AccountId) -> Self {
        Self {
            owner: owner_id,
            user_spam_counts: LookupMap::new(StorageKeys::UserSpamCounts),
            users: LookupMap::new(StorageKeys::Users),
            groups: LookupMap::new(StorageKeys::Groups),
            public_groups: UnorderedSet::new(StorageKeys::PublicGroups),
            public_channels: UnorderedSet::new(StorageKeys::PublicChannels),
            user_groups: LookupMap::new(StorageKeys::UserGroups),
            owner_groups: LookupMap::new(StorageKeys::OwnerGroups),
            groups_count: 0,
            messages_count: 0,
        }
    }

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
        self.groups.get(&id).unwrap().into()
    }

    pub fn get_public_groups(&self) -> (Vec<Group>, Vec<Group>) {
        let page_limit = 6;
        let groups_id_list: Vec<u32> = self.public_groups.iter()
            // .skip(start_index as usize)
            .take(page_limit as usize)
            .collect();
        let channels_id_list: Vec<u32> = self.public_channels.iter()
            // .skip(start_index as usize)
            .take(page_limit as usize)
            .collect();

        let groups = groups_id_list.into_iter().map(
            |id| Group::from(self.groups.get(&id).unwrap())
        ).collect();
        let channels = channels_id_list.into_iter().map(
            |id| Group::from(self.groups.get(&id).unwrap())
        ).collect();

        (groups, channels)
    }

    /**
     * Get User Info
     */
    pub fn get_user_info(&self, address: AccountId) -> Option<User> {
        let user = self.users.get(&address);
        if user.is_some() {
            let user: User = user.unwrap().into();
            return Some(user);
        }
        None
    }

    pub fn get_spam_count(&self, address: AccountId) -> u32 {
        let user_spam = self.user_spam_counts.get(&address);
        if user_spam.is_some() {
            return user_spam.unwrap();
        }
        return 0;
    }

    /**
     * Get owner groups
     */
    pub fn get_owner_groups(&self, account: AccountId) -> Vec<Group> {
        let id_list = self.owner_groups.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|id| self.groups.get(&id).unwrap().into()).collect()
    }

    /**
     * Get user groups
     */
    pub fn get_user_groups(&self, account: AccountId) -> Vec<Group> {
        let id_list = self.user_groups.get(&account).unwrap_or(vec![]);
        id_list.iter().map(|id| self.groups.get(&id).unwrap().into()).collect()
    }

    /**
     * Create new group
     */
    #[payable]
    pub fn create_new_group(
        &mut self, title: String, image: String, text: String, url: String, group_type: GroupType,
        members: Vec<AccountId>, edit_members: Option<bool>,
    ) -> u32 {
        let account = env::predecessor_account_id();
        let owner_groups_count = self.owner_groups.get(&account).unwrap_or(vec![]).len();

        self.user_validate_spam();
        if owner_groups_count + 1 > self.get_owner_groups_limit(&account) as usize {
            env::panic_str("Groups limit reached");
        }
        if env::attached_deposit() < Contract::convert_to_yocto(CREATE_GROUP_PRICE) {
            env::panic_str("Wrong payment amount");
        }
        if members.len() > self.get_group_members_limit() as usize {
            env::panic_str("You can't add so much group members");
        }
        if title.len() < 3 as usize || title.len() >= 160 as usize {
            env::panic_str("Wrong group title length");
        }
        if text.len() > 300 as usize {
            env::panic_str("Wrong group text length");
        }

        // Ability to manage users in chatMe interface (default = true)
        let mut members_list_edit = true;
        if edit_members.is_some() && edit_members.unwrap() == false {
            members_list_edit = false;
        }
        self.create_group_internal(title, image, text, url, group_type, members, members_list_edit)
    }

    /**
     * Edit group
     * (only group owner)
     */
    pub fn edit_group(&mut self, id: u32, title: String, image: String, text: String, url: String) {
        let mut group: Group = self.groups.get(&id).unwrap().into();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if title.len() < 3 as usize || title.len() >= 160 as usize {
            env::panic_str("Wrong group title length");
        }
        if text.len() > 300 as usize {
            env::panic_str("Wrong group text length");
        }

        group.title = title;
        group.image = image;
        group.url = url;
        group.text = text;

        self.groups.insert(&id, &group.into());
    }

    /**
     * Add group members
     * (only group owner)
     */
    pub fn owner_add_group_members(&mut self, id: u32, members: Vec<AccountId>) {
        let group: Group = self.groups.get(&id).unwrap().into();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if group.members.len() + members.len() > self.get_group_members_limit() as usize {
            env::panic_str("Group members limit reached");
        }
        if members.len() == 0 {
            env::panic_str("Please add members");
        }
        if group.group_type == GroupType::Channel {
            env::panic_str("You can't add members to Channel");
        }

        self.add_group_member_internal(members, id, true);
    }

    /**
     * Remove group members
     * (only group owner)
     */
    pub fn owner_remove_group_members(&mut self, id: u32, members: Vec<AccountId>) {
        let group: Group = self.groups.get(&id).unwrap().into();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if members.len() == 0 {
            env::panic_str("Please provide members for removal");
        }
        if group.group_type == GroupType::Channel {
            env::panic_str("You can't remove members from Channel");
        }

        self.remove_group_member_internal(members, id, true);
    }

    /**
     * Remove group
     * (only group owner)
     */
    pub fn owner_remove_group(&mut self, id: u32, confirm_title: String) {
        let group: Group = self.groups.get(&id).unwrap().into();
        if group.owner != env::predecessor_account_id() {
            env::panic_str("No access to group modification");
        }
        if confirm_title != group.title {
            env::panic_str("Wrong approval for remove");
        }

        self.remove_group_internal(id, group);
    }

    /**
     * Join public group
     * (each member pay 0.01N to avoid spam)
     */
    #[payable]
    pub fn join_public_group(&mut self, id: u32) {
        let group: Group = self.groups.get(&id).unwrap().into();
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
        if group.members.len() + 1 > self.get_group_members_limit() as usize {
            env::panic_str("Group members limit reached");
        }

        self.add_group_member_internal(vec![member], id, true);
    }

    /**
     * Join channel
     * (each member pay 0.00001N)
     */
    #[payable]
    pub fn join_public_channel(&mut self, id: u32) {
        let group: Group = self.groups.get(&id).unwrap().into();
        let member = env::predecessor_account_id();

        if group.group_type != GroupType::Channel {
            env::panic_str("Can't join this group, it is public channel");
        }
        if env::attached_deposit() < Contract::convert_to_yocto(JOIN_CHANNEL_PRICE) {
            env::panic_str("Wrong payment amount");
        }

        self.add_group_member_internal(vec![member], id, false);
    }

    /**
     * Leave group
     */
    pub fn leave_group(&mut self, id: u32) {
        let group: Group = self.groups.get(&id).unwrap().into();
        let member = env::predecessor_account_id();
        if !group.members.contains(&member) {
            env::panic_str("You don't participate in this group");
        }
        if group.owner == member {
            env::panic_str("You can't leave your own group");
        }
        if group.group_type == GroupType::Channel {
            env::panic_str("This group is channel, please use 'leave_channel' method");
        }

        self.remove_group_member_internal(vec![member], id, true);
    }

    /**
     * Leave channel
     */
    pub fn leave_channel(&mut self, id: u32) {
        let channel: Group = self.groups.get(&id).unwrap().into();
        let member = env::predecessor_account_id();
        if channel.owner == member {
            env::panic_str("You can't leave your own channel");
        }
        if channel.group_type != GroupType::Channel {
            env::panic_str("This group is not channel, please use 'leave_group' method");
        }

        self.remove_group_member_internal(vec![member], id, false);
    }

    /**
     * Private Message
     */
    pub fn send_private_message(
        &mut self, text: String, image: String, to_address: AccountId, reply_message_id: Option<String>,
    ) -> U128 {
        self.user_validate_spam();

        let account = env::predecessor_account_id();
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
    pub fn send_group_message(
        &mut self, text: String, image: String, group_id: u32, reply_message_id: Option<String>,
    ) -> U128 {
        let group: Group = self.groups.get(&group_id).unwrap().into();
        let account = env::predecessor_account_id();
        self.user_validate_spam();

        if group.group_type == GroupType::Channel && group.owner != account {
            env::panic_str("No access to this group");
        }
        if group.group_type == GroupType::Private && group.owner != account {
            if !group.members.contains(&account) {
                env::panic_str("No access to this group");
            }
        }
        if group.group_type == GroupType::Public && !group.members.contains(&account) {
            env::panic_str("Please join public group before sending messages");
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
     * Increase User Level
     */
    #[payable]
    pub fn user_account_level_up(&mut self) {
        let account = env::predecessor_account_id();
        let level_increase = Contract::get_level_increase_by_deposit();

        let user_account = self.users.get(&account);
        if user_account.is_some() {
            let mut user_account: User = user_account.unwrap().into();
            user_account.level += level_increase;
            if user_account.level > 2 {
                env::panic_str("Account level error");
            }
            self.users.insert(&account, &user_account.into());
        } else {
            self.create_user_internal(&account, level_increase);
        }
    }

    /**
     * Admin - update account level
     */
    #[payable]
    pub fn admin_set_user_level(&mut self, account: AccountId, level: u8) {
        assert_one_yocto();
        let user_account = self.users.get(&account);

        if self.owner != env::predecessor_account_id() {
            env::panic_str("No Access");
        }
        if level < 1 || level > 2 {
            env::panic_str("Account level error");
        }

        if user_account.is_some() {
            let mut user_account: User = user_account.unwrap().into();
            user_account.level = level;
            self.users.insert(&account, &user_account.into());
        } else {
            self.create_user_internal(&account, level);
        }
    }

    /**
     * Admin - verify account
     */
    #[payable]
    pub fn admin_user_account_verify(&mut self, account: AccountId) {
        assert_one_yocto();
        if self.owner != env::predecessor_account_id() {
            env::panic_str("No Access");
        }

        let mut user_account: User = self.users.get(&account).expect("Account not found").into();
        if user_account.level != 2 {
            env::panic_str("Account level should be 'Gold'");
        }

        user_account.verified = true;
        self.users.insert(&account, &user_account.into());
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

    fn create_test_group(contract: &mut Contract, title: String, group_type: GroupType, members: Vec<AccountId>) {
        set_context(NEAR_ID, Contract::convert_to_yocto(CREATE_GROUP_PRICE));
        contract.create_new_group(
            title, "".to_string(), "".to_string(), "".to_string(), group_type, members,
        );
    }

    #[test]
    fn test_contract_owner() {
        let contract = Contract::init(NEAR_ID.parse().unwrap());
        assert_eq!(contract.owner, NEAR_ID.parse().unwrap())
    }

    #[test]
    fn send_private_message() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());

        let message_id = contract.send_private_message("Test message".to_string(), "".to_string(), "test.testnet".parse().unwrap(), None);
        assert_eq!(message_id, U128::from(1));
    }

    #[test]
    fn create_private_group() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "Group 1".to_string(), GroupType::Private, vec![
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
    fn edit_private_group() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "group 1".to_string(), GroupType::Private, vec![]);

        contract.edit_group(
            1, "group updated".to_string(), "".to_string(), "description...".to_string(), "https://someurl.com".to_string(),
        );
        let group = contract.get_group_by_id(1);
        assert_eq!(group.title, "group updated".to_string());
        assert_eq!(group.group_type, GroupType::Private);
    }

    #[test]
    fn create_public_group() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "group".to_string(), GroupType::Public, vec![]);

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
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "group".to_string(), GroupType::Public, vec![]);

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
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "Private group".to_string(), GroupType::Private, vec![
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
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "Private group".to_string(), GroupType::Private, vec![
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
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "Private group".to_string(), GroupType::Private, vec![
            "m1.testnet".parse().unwrap(), "m2.testnet".parse().unwrap(),
        ]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_group_message("Test message 1".to_string(), "".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to this group")]
    fn readonly_group_message_no_access() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "Readonly group".to_string(), GroupType::Channel, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.send_group_message("Test message 1".to_string(), "".to_string(), 1, None);
    }

    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn remove_group_no_access() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "group".to_string(), GroupType::Private, vec![]);

        // Test guest message - error expected
        set_context("guest.testnet", 0);
        contract.owner_remove_group(1, "group".to_string());
    }

    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn edit_group_no_access() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "My group".to_string(), GroupType::Channel, vec![]);

        set_context("guest.testnet", 0);
        contract.edit_group(
            1, "group updated".to_string(), "".to_string(), "".to_string(), "".to_string(),
        );
    }


    #[test]
    #[should_panic(expected = "No access to group modification")]
    fn group_add_members_no_access() {
        let mut contract = Contract::init(NEAR_ID.parse().unwrap());
        create_test_group(&mut contract, "My group".to_string(), GroupType::Public, vec![]);

        set_context("guest.testnet", 0);
        contract.owner_add_group_members(
            1, vec!["some.testnet".parse().unwrap()],
        );
    }
}
