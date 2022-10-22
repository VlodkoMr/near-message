import { create, open } from "@nearfoundation/near-js-encryption-box";
import { KeyPairEd25519 } from "near-api-js/lib/utils/key_pair";

const MY_PREFIX = "my-chatme-keys";
const CHAT_PREFIX = "chat-key";

export class SecretChat {

  constructor(opponentAddress, near = null) {
    this.near = near;
    this.opponentAddress = opponentAddress;

    if (near && !this.myKeyExists()) {
      this.generateMyKeys();
    }
  }

  // ----------- My keys -----------

  generateMyKeys() {
    const newKey = KeyPairEd25519.fromRandom();
    const keys = {
      public: newKey.publicKey.toString().replace("ed25519:", ""),
      private: newKey.secretKey,
    }
    localStorage.setItem(`${MY_PREFIX}:${this.near.wallet.accountId}`, JSON.stringify(keys));
  }

  myKeyExists() {
    return !!this.getMyPublicKey()
  }


  getMyPublicKey() {
    let myKeys = localStorage.getItem(`${MY_PREFIX}:${this.near.wallet.accountId}`);
    if (myKeys) {
      let keys = JSON.parse(myKeys);
      return keys.public;
    }
  }

  getMyPrivateKey() {
    let myKeys = localStorage.getItem(`${MY_PREFIX}:${this.near.wallet.accountId}`);
    if (myKeys) {
      let keys = JSON.parse(myKeys);
      return keys.private;
    }
  }

  // ----------- Chat -----------

  chatKeyExists() {
    return !!this.chatPublicKey()
  }

  chatPublicKey() {
    console.log(`${CHAT_PREFIX}${this.opponentAddress}`);
    return localStorage.getItem(`${CHAT_PREFIX}:${this.opponentAddress}`)
  }

  decode(text, nonce) {
    const myPrivateKey = this.getMyPrivateKey();
    return open(text, this.chatPublicKey(), myPrivateKey, nonce);
  }

  encode(text) {
    const encoded = create(text, this.chatPublicKey(), this.getMyPrivateKey());
    return {
      secret: encoded.secret,
      nonce: encoded.nonce
    }
  }

  storeSecretChatKey(messageText) {
    const keyParts = messageText.split(":");
    const chatPublicKey = keyParts[1].replace(")", "");
    if (keyParts.length) {
      localStorage.setItem(`${CHAT_PREFIX}:${this.opponentAddress}`, chatPublicKey);
    }
  }

  startNewChat() {
    return new Promise((resolve, reject) => {
      const pubKey = this.getMyPublicKey();
      const message = `(secret-start:${pubKey})`;
      this.near.mainContract.sendPrivateMessage(message, "", this.opponentAddress, "", "").then(() => {
        resolve(true);
      }).catch(() => {
        reject();
      });
    })
  }

  acceptChat(messageText) {
    return new Promise((resolve, reject) => {
      this.storeSecretChatKey(messageText);

      const pubKey = this.getMyPublicKey();
      const message = `(secret-accept:${pubKey})`;
      this.near.mainContract.sendPrivateMessage(message, "", this.opponentAddress, "", "").then(() => {
        resolve(true);
      }).catch(() => {
        reject();
      });
    })
  }

  endChat() {
    localStorage.removeItem(`${PREFIX}:${this.opponentAddress}`);
    return new Promise((resolve, reject) => {
      let message = `(secret-end)`;
      this.near.mainContract.sendPrivateMessage(message, "", this.opponentAddress, "", "").then(() => {
        resolve(true);
      }).catch(() => {
        reject();
      })
    })
  }


}

