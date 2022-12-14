#!/bin/sh

OWNER_ID=vlodkow.testnet

NEAR_ID_1=vlodkow.testnet
NEAR_ID_2=vlodkow2.testnet
NEAR_ID_3=vlodkow3.testnet
CONTRACT_ID=$(<neardev/dev-account)

near call $CONTRACT_ID init '{"owner_id":"'$OWNER_ID'"}' --accountId $OWNER_ID

#----------- Private Messages

near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 1. Some additional long text and some additional long text and some additional long text and some additional long text.", "image":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 2", "image":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | '$ID' - 3", "image":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
near call $CONTRACT_ID send_private_message '{"text":"vlodkow2 -> vlodkow3 | '$ID' - 4", "image":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_2
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow2 | '$ID' - 5", "image":"", "to_address":"vlodkow2.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow3 -> vlodkow | '$ID' - 6", "image":"", "to_address":"vlodkow.testnet"}' --accountId $NEAR_ID_3
near call $CONTRACT_ID send_private_message '{"text":"vlodkow -> vlodkow3 | '$ID' - 7. Hello | Привіт | 歡迎 | أهلا وسهلا", "image":"", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1

#----------- Goom Messages

for GROUP_ID in {1..2}; do
  near call $CONTRACT_ID create_new_group '{"title":"Group-X'$GROUP_ID'", "image":"", "url":"", "text":"description...", "group_type": "Private", "members":["'$NEAR_ID_2'","'$NEAR_ID_3'"]}' --accountId $NEAR_ID_1 --deposit 0.25
  near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "text":"My first group message in '$GROUP_ID'", "image":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "text":"My second group message in '$GROUP_ID'", "image":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "text":"Some reply group message in '$GROUP_ID'", "image":""}' --accountId $NEAR_ID_3
  near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "text":"Last group message in '$GROUP_ID'", "image":""}' --accountId $NEAR_ID_2
  near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "text":"Also last group message in '$GROUP_ID'", "image":""}' --accountId $NEAR_ID_3
done

### test errors
#near call $CONTRACT_ID send_group_message '{"group_id":'$GROUP_ID', "texts":"is error"}' --accountId $NEAR_ID_3
#near call $CONTRACT_ID send_private_message '{"texts":"is error", "to_address":"vlodkow3.testnet"}' --accountId $NEAR_ID_1
