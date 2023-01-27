import React, { createContext, useEffect, useState } from "react";
import MainContract from "../interfaces/mainContract";
import SocialDBContract from "../interfaces/socialDBContract";
import { WalletSelectorEvents } from "@near-wallet-selector/core/lib/wallet-selector.types";
import { INearContext } from "../types";

type Props = {
  children: React.ReactNode,
  isSignedInit: boolean,
  wallet: any,
  mainContract: MainContract|null,
  socialDBContract: SocialDBContract|null
}

export const NearContext = createContext<INearContext>({
  wallet: null,
  mainContract: null,
  socialDBContract: null,
  isSigned: false,
  account: null
});

const NearProvider: React.FC<Props> = (
  {
    children, isSignedInit, wallet, mainContract, socialDBContract
  }: Props) => {
  const [ account, setAccount ] = useState(wallet.accountId);
  const [ isSigned, setIsSigned ] = useState(isSignedInit);

  const loadAccount = async () => {
    if (mainContract) {
      return await mainContract.getUserInfo(wallet.accountId);
    }
  }

  useEffect(() => {
    const subscription = wallet.walletSelector.store.observable.subscribe(async (nextAccounts: WalletSelectorEvents['accountsChanged']) => {
      if (nextAccounts.accounts.length) {
        await wallet.onAccountChange(nextAccounts.accounts[0].accountId);
        setIsSigned(true);

        loadAccount().then(account => {
          setAccount(account);
        });
      } else {
        setIsSigned(false);
        setAccount(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <NearContext.Provider value={{
      wallet,
      mainContract,
      socialDBContract,
      isSigned,
      account
    }}>
      {children}
    </NearContext.Provider>
  )
};

export default NearProvider;