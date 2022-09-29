near-blank-project
==================

This app was initialized with [create-near-app]


Quick Start
===========

If you haven't installed dependencies during setup:

    npm install

Build and deploy your contract to TestNet with a temporary dev account:

    npm run deploy

Test your contract:

    npm test

If you have a frontend, run `npm start`. This will run a dev server.



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