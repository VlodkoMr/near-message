#!/bin/sh

NEAR_ID_1=vlodkow.testnet
NEAR_ID_2=vlodkow2.testnet
NEAR_ID_3=vlodkow3.testnet
CONTRACT_ID=$(<neardev/dev-account)

#----------- Private Messages

for ID in {1..2}; do
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 1. Some additional long text and some additional long text and some additional long text and some additional long text.", "media":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 2", "media":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | '$ID' - 3", "media":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow2 -> vlodkow3 | '$ID' - 4", "media":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow2 | '$ID' - 5", "media":"", "to_address":"vlodkow2.testnet"}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 6", "media":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | '$ID' - 7. Hello | Привіт | 歡迎 | أهلا وسهلا", "media":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
done

#----------- Room Messages

for ROOM_ID in {1..2}; do
  near call $CONTRACT_ID create_new_room '{"title":"RoomX", "media":"", "is_private": false, "is_read_only": false, "members":["'$NEAR_ID_2'","'$NEAR_ID_3'"]}' --accountId $NEAR_ID_1 --deposit 0.25
  near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"My first room message in '$ROOM_ID'", "media":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"My second room message in '$ROOM_ID'", "media":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Some reply room message in '$ROOM_ID'", "media":""}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Last room message in '$ROOM_ID'", "media":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "text":"Also last room message in '$ROOM_ID'", "media":""}' --accountId $NEAR_ID_3
done

### test errors
#near call $CONTRACT_ID send_room_message '{"room_id":'$ROOM_ID', "texts":"is error"}' --accountId $NEAR_ID_3
#near call $CONTRACT_ID send_private_message '{"texts":"is error", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
