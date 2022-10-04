#!/bin/sh

NEAR_ID_1=vlodkow.testnet
NEAR_ID_2=vlodkow2.testnet
NEAR_ID_3=vlodkow3.testnet
CONTRACT_ID=$(<neardev/dev-account)

#----------- Private Messages

near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | 1", "to_user":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | 2", "to_user":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | 3", "to_user":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
near call $CONTRACT_ID send_private_message '{"text":"vlodkow2 -> vlodkow3 | 4", "to_user":"vlodkow3.testnet"}' --accountId $NEAR_ID_2
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow2 | 5", "to_user":"vlodkow2.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | 6", "to_user":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | 7", "to_user":"vlodkow3.testnet"}' --accountId $NEAR_ID_1

#----------- Room Messages

ROOM_ID=1
near call $CONTRACT_ID create_new_room '{"title":"RoomX", "media":"", "is_private": false, "is_read_only": false, "members":["'$NEAR_ID_2'","'$NEAR_ID_3'"]}' --accountId $NEAR_ID_1 --deposit 0.25
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"My first room message"}' --accountId $NEAR_ID_2
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"My second room message"}' --accountId $NEAR_ID_2
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Some reply room message"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Last room message"}' --accountId $NEAR_ID_2
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Also last room message"}' --accountId $NEAR_ID_3

### test errors
near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "texts":"is error"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"texts":"is error", "to_user":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
