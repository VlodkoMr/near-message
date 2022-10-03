use crate::*;

impl Contract {
    pub(crate) fn add_room_member_internal(&mut self, members: Vec<AccountId>, room_id: u32, change_room: bool) {
        let mut room = self.rooms.get(&room_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_rooms = self.user_rooms.get(&member_address).unwrap_or(vec![]);
            user_rooms.push(room.id);
            self.user_rooms.insert(&member_address, &user_rooms);

            if change_room && !room.members.contains(&member_address) {
                room.members.push(member_address.clone());
            }
        }

        if change_room {
            self.rooms.insert(&room.id, &room);
        }
    }

    pub(crate) fn remove_room_member_internal(&mut self, members: Vec<AccountId>, room_id: u32, change_room: bool) {
        let mut room = self.rooms.get(&room_id).unwrap();
        for member_address in members.into_iter() {
            let mut user_rooms = self.user_rooms.get(&member_address).unwrap_or(vec![]);
            let index = user_rooms.iter().position(|inner_id| &room.id == inner_id).unwrap();
            user_rooms.remove(index);
            self.user_rooms.insert(&member_address, &user_rooms);

            if change_room {
                let member_index = room.members.iter().position(|member| &member_address == member).unwrap();
                room.members.remove(member_index);
                self.rooms.insert(&room.id, &room);
            }
        }
    }
}
