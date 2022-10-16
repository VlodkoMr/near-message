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
                }
            }
        }

        if change_group {
            self.groups.insert(&group_id, &group.into());
        }
    }
}
