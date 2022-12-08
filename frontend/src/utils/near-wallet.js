import { providers } from 'near-api-js';

// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import LedgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import WalletConnectIconUrl from '@near-wallet-selector/wallet-connect/assets/wallet-connect-icon.png';
import HereWalletIconUrl from '@near-wallet-selector/here-wallet/assets/here-wallet-icon.png';
import MeteorWalletIconUrl from '@near-wallet-selector/meteor-wallet/assets/meteor-icon.png';
// import SenderIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png';

// wallet selector options
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
// import { setupSender } from '@near-wallet-selector/sender';

import { setupWalletConnect } from '@near-wallet-selector/wallet-connect';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";


const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

// Wallet that simplifies using the wallet selector
export class Wallet {
  accountId;
  walletSelector;
  wallet;
  network;
  createAccessKeyFor;

  constructor({ createAccessKeyFor = undefined, network = 'testnet' }) {
    this.createAccessKeyFor = createAccessKeyFor
    this.network = network
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupNearWallet({ iconUrl: NearIconUrl }),
        setupMyNearWallet({ iconUrl: MyNearIconUrl }),
        // setupSender({ iconUrl: SenderIconUrl }),
        setupHereWallet({ iconUrl: HereWalletIconUrl }),
        setupMeteorWallet({ iconUrl: MeteorWalletIconUrl }),
        setupLedger({ iconUrl: LedgerIconUrl }),
        setupWalletConnect({ iconUrl: WalletConnectIconUrl })
      ],
    });
  }

  async onAccountChange(accountId) {
    this.wallet = await this.walletSelector.wallet();
    this.accountId = accountId;
  }

  // Sign-in method
  signIn() {
    const description = 'Please select a wallet to sign in.';
    const modal = setupModal(this.walletSelector, { contractId: this.createAccessKeyFor, description });
    modal.show();
  }

  // Sign-out method
  signOut() {
    this.wallet.signOut();

    if (this.wallet.id === "near-wallet" || this.wallet.id === "my-near-wallet") {
      this.wallet = this.accountId = this.createAccessKeyFor = null;
      window.location.replace(window.location.origin + window.location.pathname);
    }
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT }) {
    // Sign a transaction with the "FunctionCall" action
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  // Get transaction result from the network
  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, 'unnused');
    return providers.getTransactionLastResult(transaction);
  }
}