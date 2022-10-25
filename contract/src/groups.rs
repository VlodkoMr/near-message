use crate::*;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub enum GroupType {
    Channel,
    Private,
    Public,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Group {
    pub id: u32,
    pub owner: AccountId,
    pub title: String,
    pub text: String,
    pub image: String,
    pub url: String,
    pub group_type: GroupType,
    pub created_at: Timestamp,
    pub members: Vec<AccountId>,
    pub members_count: u32,
    pub edit_members: bool,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum GroupVersion {
    V1(Group),
}

impl From<GroupVersion> for Group {
    fn from(version: GroupVersion) -> Self {
        match version {
            // GroupVersion::V2(v2) => v2,
            GroupVersion::V1(v1) => v1
            // {
            //     Group {
            //         id: v1.id,
            //         owner: v1.owner,
            //         title: v1.title,
            //         text: v1.text,
            //         image: v1.image,
            //         url: v1.url,
            //         group_type: v1.group_type,
            //         created_at: v1.created_at,
            //         members: v1.members,
            //     }
            // }
        }
    }
}

impl From<Group> for GroupVersion {
    fn from(group: Group) -> Self {
        GroupVersion::V1(group)
        // GroupVersion::V2(group)
    }
}

impl Contract {
    /*
     * Get owner groups limit: 5 / 50 / unlimited
     */
    pub fn get_owner_groups_limit(&self, account: &AccountId) -> u32 {
        let user_account = self.users.get(account);
        let mut limit_count = 5;
        if user_account.is_some() {
            let user_account: User = user_account.unwrap().into();
            if user_account.level == 1 {
                limit_count = 50;
            } else {
                limit_count = u32::MAX;
            }
        }

        limit_count
    }

    /*
     * Get group members limit: 500 / 2000 / 5000
     */
    pub fn get_group_members_limit(&self) -> u32 {
        let account = env::predecessor_account_id();
        let user_account = self.users.get(&account);

        let mut limit_count = 500;
        if user_account.is_some() {
            let user_account: User = user_account.unwrap().into();
            if user_account.level == 1 {
                limit_count = 2000;
            } else {
                limit_count = 5000;
            }
        }

        limit_count
    }

    // Add new members to group
    pub(crate) fn add_group_member_internal(&mut self, members: Vec<AccountId>, group_id: u32, change_group: bool) {
        let mut group: Group = self.groups.get(&group_id).unwrap().into();
        for member_address in members.into_iter() {
            let mut user_groups = self.user_groups.get(&member_address).unwrap_or(vec![]);
            if !user_groups.contains(&group.id) {
                user_groups.push(group.id);
                self.user_groups.insert(&member_address, &user_groups);
            }

            if change_group && !group.members.contains(&member_address) {
                if !group.members.contains(&member_address) {
                    group.members.push(member_address.clone());
                    group.members_count += 1;
                }
            }
        }

        if change_group {
            self.groups.insert(&group_id, &group.into());
        }
    }

    // Remove members from group
    pub(crate) fn remove_group_member_internal(&mut self, members: Vec<AccountId>, group_id: u32, change_group: bool) {
        let mut group: Group = self.groups.get(&group_id).unwrap().into();
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
                    group.members_count -= 1;
                }
            }
        }

        if change_group {
            self.groups.insert(&group_id, &group.into());
        }
    }

    pub(crate) fn create_group_internal(
        &mut self, title: String, image: String, text: String, url: String, group_type: GroupType,
        mut members: Vec<AccountId>, edit_members: bool,
    ) -> u32 {
        let owner = env::predecessor_account_id();
        let mut owner_groups = self.owner_groups.get(&owner).unwrap_or(vec![]);

        self.groups_count += 1;
        let group_id = self.groups_count;

        // channel don't use members internal list
        if group_type == GroupType::Channel {
            members = vec![];
        }

        let group = Group {
            id: group_id,
            owner: owner.clone(),
            title,
            text,
            image,
            url,
            group_type: group_type.clone(),
            created_at: env::block_timestamp(),
            members: members.clone(),
            members_count: members.len() as u32,
            edit_members,
        };
        self.groups.insert(&group_id, &group.into());

        // add for owner
        owner_groups.push(group_id.clone());
        self.owner_groups.insert(&owner, &owner_groups);

        // add to public/channels list
        if group_type == GroupType::Public {
            self.public_groups.insert(&group_id);
        }
        if group_type == GroupType::Channel {
            self.public_channels.insert(&group_id);
        }

        // add to user groups
        if members.len() > 0 {
            self.add_group_member_internal(members, group_id, false);
        }
        group_id
    }

    pub(crate) fn remove_group_internal(&mut self, id: u32, group: Group) {
        // remove from public/channels list
        if group.group_type == GroupType::Public {
            self.public_groups.remove(&id);
        }
        if group.group_type == GroupType::Channel {
            self.public_channels.remove(&id);
        }

        self.remove_group_member_internal(group.members, id, false);
        self.groups.remove(&id);
    }

    pub(crate) fn get_public_group_channel(&self, source: &UnorderedSet<u32>, page_limit: u32) -> Vec<Group> {
        let groups_id_list: Vec<u32> = source.iter()
            // .skip(start_index as usize)
            .take(page_limit as usize)
            .collect();
        groups_id_list.into_iter().map(
            |id| Group::from(self.groups.get(&id).unwrap())
        ).collect()
    }
}
