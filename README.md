NEAR ChatMe
==================

Chat & Messages on NEAR Blockchain.

Protect messages:
https://github.com/NEARFoundation/near-js-encryption-box


Quick Start
===========

If you haven't installed dependencies during setup:

    npm install

Build and deploy your contract to TestNet with a temporary dev account:

    npm run deploy

Test your contract:

    npm test

If you have a frontend, run `npm start`. This will run a dev server.


Spam detection
===============

We lock message sending for spam accounts based on account type:
- Free: up to 10 spam reports till account will be locked forever.
- Bronze: lock after last spam report. Lock time based on spam count reports (up to 1 hour).
- Gold: lock after last spam report. Lock time based on spam count reports divided by 6 (up to 10 minutes).

Accounts that send spam from Bronze or Gold account can receive additional locks when account is used for spam.


Contract Iteraction
===============

##### Send new Message

``` 
CONTRACT_ID=$(<contract/neardev/dev-account)
NEAR_ID=vlodkow.testnet

near call $CONTRACT_ID send_message '{"text": "Hello world text! My first message.", "toUser": "vlodkow2.testnet"}' --accountId $NEAR_ID
```

The Graph
===============

##### Init

```
graph init
```

? Protocol › near
? Subgraph name › vlodkomr/nearmessage
? Directory to create the subgraph in › thegraph
? NEAR network › near-testnet
? Contract account › dev-1664451675763-39777161611804
? Contract Name · NearMessage

##### Build

``` 
graph codegen && graph build
```

##### Deploy

``` 
ACCESS_TOKEN=
graph auth https://api.thegraph.com/deploy/ $ACCESS_TOKEN
yarn deploy
```