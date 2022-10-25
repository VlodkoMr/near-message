import { create, open } from "@nearfoundation/near-js-encryption-box";
import { KeyPairEd25519 } from "near-api-js/lib/utils/key_pair";

// {public, private}
const MY_PREFIX = "chatme:my-keys";

// {account:{key, enabled}}
const CHAT_PREFIX = "chatme:chat-keys";


export class SecretChat {

  constructor(opponentAddress, myAddress) {
    this.opponentAddress = opponentAddress;
    this.myAddress = myAddress;

    if (!this.myKeyExists()) {
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

  isPrivateModeEnabled() {
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
    return open(text, this.chatPublicKey(), this.getMyPrivateKey(), nonce);
  }

  encode(text) {
    const encoded = create(text, this.chatPublicKey(), this.getMyPrivateKey());
    return {
      secret: encoded.secret,
      nonce: encoded.nonce
    }
  }

  storeSecretChatKey(messageText) {
    console.log(`messageText`, messageText);
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

  switchPrivateMode(isEnabled) {
    const chatKey = `${CHAT_PREFIX}:${this.myAddress}`;
    const chat = localStorage.getItem(chatKey);
    const chatData = JSON.parse(chat);
    chatData[this.opponentAddress].enabled = isEnabled;
    localStorage.setItem(chatKey, JSON.stringify(chatData));
  }

  // Export keys
  static getKeysForExport(myAddress) {
    const myKeys = localStorage.getItem(`${MY_PREFIX}:${myAddress}`);
    const chatKeys = localStorage.getItem(`${CHAT_PREFIX}:${myAddress}`);
    if (myKeys) {
      return btoa(`${myKeys}|${chatKeys}`);
    } else {
      alert("Private keys not found");
    }
  }

  static importKeys(myAddress, importData) {
    let keyData;
    try {
      keyData = atob(importData);
    } catch (e) {
      alert(`Unable to decode your key, make sure the key text imported entirety`)
    }
    const keys = keyData.split("|");
    if (keys.length === 2) {
      const myKey = JSON.parse(keys[0]);
      const chatsKey = JSON.parse(keys[1]);
      localStorage.setItem(`${MY_PREFIX}:${myAddress}`, JSON.stringify(myKey));
      localStorage.setItem(`${CHAT_PREFIX}:${myAddress}`, JSON.stringify(chatsKey));
      return true;
    } else {
      alert(`Unable to decode your key, invalid data`)
    }
    return false;
  }

}

