import { BrowserLocalStorageKeyStore } from "near-api-js/lib/key_stores";
import { create, open } from "@nearfoundation/near-js-encryption-box";

const PREFIX = "secretChatKey:";
const keyStore = new BrowserLocalStorageKeyStore();

export class SecretChat {

  constructor(opponentAddress, near = null) {
    this.near = near;
    this.opponentAddress = opponentAddress;
  }

  exists() {
    return !!localStorage.getItem(`${PREFIX}${this.opponentAddress}`)
  }

  opponentPublicKey() {
    return localStorage.getItem(`${PREFIX}${this.opponentAddress}`)
  }

  async encode(text) {
    const myPrivateKey = await this.getMyPrivateKey();
    const myPublicKey = await this.getMyPublicKey();
    const encoded = create(text, this.opponentPublicKey(), myPrivateKey.toString());
    return {
      secret: encoded.secret,
      key: `${encoded.nonce}|${myPublicKey}`
    }
  }

  async decode(text, nonce) {
    const myPrivateKey = await this.getMyPrivateKey();
    return open(text, this.opponentPublicKey(), myPrivateKey.toString(), nonce);
  }

  storeSecretChatKey(messageText) {
    const keyParts = messageText.split(":");
    const opponentPublicKey = keyParts[1].replace(")", "");
    if (keyParts.length) {
      localStorage.setItem(`${PREFIX}${this.opponentAddress}`, opponentPublicKey);
    }
  }

  startNewChat() {
    return new Promise(async (resolve, reject) => {
      const pubKey = await this.getMyPublicKey();
      const message = `(secret-start:${pubKey})`;
      this.near.mainContract.sendPrivateMessage(message, "", this.opponentAddress, "", "").then(() => {
        resolve(true);
      }).catch(() => {
        reject();
      });
    })
  }

  acceptChat(messageText) {
    return new Promise(async (resolve, reject) => {
      this.storeSecretChatKey(messageText);

      const pubKey = await this.getMyPublicKey();
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


  async getMyPublicKey() {
    const myKeys = await keyStore.getKey(process.env.NEAR_NETWORK, this.near.wallet.accountId);
    return myKeys.publicKey.toString().replace("ed25519:", "");
  }

  async getMyPrivateKey() {
    const myKeys = await keyStore.getKey(process.env.NEAR_NETWORK, this.near.wallet.accountId);
    return myKeys.secretKey;
  }

  // generateRandom(length = 20) {
  //   let randomStr = "";
  //   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (let index = 0; index < length; index++) {
  //     randomStr += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   return randomStr;
  // };

}

