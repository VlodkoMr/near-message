NEAR ChatMe
==================

Chats & Messages service for NEAR Blockchain.

Requirements
===========

- nodeJS
- npm
- The Graph: @graphprotocol/graph-cli package

Quick Start
===========

If you haven't installed dependencies during setup:

```
npm install
```

Build and deploy your contract to TestNet with a temporary dev account:

```
npm run deploy
```

Test your contract:

```
npm test
```

If you have a frontend, run `npm start`. This will run a dev server.


The Graph
===============

##### Init

```
graph init
```

? Protocol › near
? Subgraph name › vlodkomr/chatme
? Directory to create the subgraph in › thegraph
? NEAR network › near-testnet
? Contract account › .... contract address....
? Contract Name · ChatMe

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

##### Contracts

near-message.testnet - Local
chatme.testnet - TestNet
chatme.near - MainNet

##### Links

Testnet: https://test.chatme.page/
Mainnet: https://chatme.page/

Package used for message encryption: https://github.com/NEARFoundation/near-js-encryption-box
Documentation: https://chatme.gitbook.io/chatme
