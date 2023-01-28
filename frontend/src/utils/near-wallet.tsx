import { providers } from 'near-api-js';

// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import LedgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
import HereWalletIconUrl from '@near-wallet-selector/here-wallet/assets/here-wallet-icon.png';
import MeteorWalletIconUrl from '@near-wallet-selector/meteor-wallet/assets/meteor-icon.png';
import SenderIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png';

// wallet selector options
import { setupWalletSelector, Wallet as WalletNEAR } from '@near-wallet-selector/core';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';

import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { WalletSelector } from "@near-wallet-selector/core/lib/wallet-selector.types";
import { NetworkId } from "@near-wallet-selector/core/lib/options.types";


const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

// Wallet that simplifies using the wallet selector
export class Wallet {
  accountId: string|undefined = undefined;
  walletSelector: WalletSelector|undefined = undefined;
  wallet: WalletNEAR|undefined = undefined;
  network: NetworkId;
  createAccessKeyFor: string|undefined;

  constructor({ createAccessKeyFor = undefined, network = 'testnet' }) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = network as NetworkId;
  }

  // To be called when the website loads
  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupNearWallet({ iconUrl: NearIconUrl }),
        setupMyNearWallet({ iconUrl: MyNearIconUrl }),
        setupSender({ iconUrl: SenderIconUrl }),
        setupMeteorWallet({ iconUrl: MeteorWalletIconUrl }),
        setupHereWallet({ iconUrl: HereWalletIconUrl }),
        setupLedger({ iconUrl: LedgerIconUrl }),
        // setupWalletConnect({ iconUrl: WalletConnectIconUrl })
      ],
    });

    const isSignedIn = this.walletSelector.isSignedIn();

    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
    }

    return isSignedIn;
  }

  async onAccountChange(accountId: string) {
    this.wallet = await this.walletSelector?.wallet();
    this.accountId = accountId;
  }

  // Sign-in method
  signIn() {
    const description = 'Please select a wallet to sign in.';
    const modal = setupModal(this.walletSelector as WalletSelector, {
      contractId: this.createAccessKeyFor as string,
      description
    });
    modal.show();
  }

  // Sign-out method
  signOut() {
    if (!this.wallet) return;
    this.wallet.signOut();

    if (this.wallet.id === "near-wallet" || this.wallet.id === "my-near-wallet") {
      this.wallet = this.accountId = this.createAccessKeyFor = undefined;
      window.location.replace(window.location.origin + window.location.pathname);
    }
  }

  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }: {contractId: string, method: string, args: {}}) {
    if (!this.walletSelector) return;

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res: any = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  }

  // Call a method that changes the contract's state
  async callMethod({
                     contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT
                   }: {contractId: string, method: string, args: {}, gas?: string, deposit?: string}) {
    // Sign a transaction with the "FunctionCall" action
    if (!this.wallet) return;

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
  async getTransactionResult(txHash: string) {
    if (!this.walletSelector) return;

    const { network } = this.walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txHash, 'unnused');
    return providers.getTransactionLastResult(transaction);
  }
}