import { create, open } from "@nearfoundation/near-js-encryption-box";
import { KeyPairEd25519 } from "near-api-js/lib/utils/key_pair";

// {public, private}
const MY_PREFIX = "chatme:my-keys";

// {account:{key, enabled}}
const CHAT_PREFIX = "chatme:chat-keys";


export class SecretChat {

  constructor(opponentAddress, myAddress, near = null) {
    this.near = near;
    this.opponentAddress = opponentAddress;
    this.myAddress = myAddress;

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
    localStorage.setItem(`${MY_PREFIX}:${this.myAddress}`, JSON.stringify(keys));
  }

  myKeyExists() {
    return !!this.getMyPublicKey()
  }


  getMyPublicKey() {
    let myKeys = localStorage.getItem(`${MY_PREFIX}:${this.myAddress}`);
    if (myKeys) {
      let keys = JSON.parse(myKeys);
      return keys.public;
    }
  }

  getMyPrivateKey() {
    let myKeys = localStorage.getItem(`${MY_PREFIX}:${this.myAddress}`);
    if (myKeys) {
      let keys = JSON.parse(myKeys);
      return keys.private;
    }
  }

  // ----------- Chat -----------

  getSecretChat() {
    const chat = localStorage.getItem(`${CHAT_PREFIX}:${this.myAddress}`);
    if (chat) {
      const chatData = JSON.parse(chat);
      if (chatData[this.opponentAddress]) {
        return chatData[this.opponentAddress];
      }
    }
  }

  isSecretChatEnabled() {
    const secretChat = this.getSecretChat();
    if (secretChat) {
      return secretChat.enabled;
    }
    return false;
  }

  chatPublicKey() {
    const secretChat = this.getSecretChat();
    if (secretChat) {
      return secretChat.key;
    }
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
      let currentData = {};
      let chat = localStorage.getItem(`${CHAT_PREFIX}:${this.myAddress}`);
      if (chat) {
        currentData = JSON.parse(chat);
      }
      currentData[this.opponentAddress] = {
        key: chatPublicKey,
        enabled: true
      };
      localStorage.setItem(`${CHAT_PREFIX}:${this.myAddress}`, JSON.stringify(currentData));
    }
  }

  startNewChat() {
    return new Promise((resolve, reject) => {
      const secretChat = this.getSecretChat();
      if (secretChat) {
        this.switchPrivateMode(true);
        resolve(true);
      } else {
        const pubKey = this.getMyPublicKey();
        const message = `(secret-start:${pubKey})`;
        this.near.mainContract.sendPrivateMessage(message, "", this.opponentAddress, "", "").then(() => {
          resolve(true);
        }).catch(() => {
          reject();
        });
      }
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

  switchPrivateMode(isEnabled) {
    const chatKey = `${CHAT_PREFIX}:${this.myAddress}`;
    const chat = localStorage.getItem(chatKey);
    const chatData = JSON.parse(chat);
    chatData[this.opponentAddress].enabled = isEnabled;
    localStorage.setItem(chatKey, JSON.stringify(chatData));
  }

  endChat() {
    this.switchPrivateMode(false);

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

