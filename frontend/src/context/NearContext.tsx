import React, { createContext, useEffect, useState } from "react";
import MainContract from "../contracts/mainContract";
import SocialDBContract from "../contracts/socialDBContract";
import { INearContext, IUserAccount } from "../types";
import { Wallet } from "../utils/near-wallet";

type Props = {
  children: React.ReactNode,
  isSignedInit: boolean,
  wallet: Wallet,
  mainContract: MainContract|undefined,
  socialDBContract: SocialDBContract|undefined
}

export const NearContext = createContext<INearContext>({
  wallet: undefined,
  mainContract: undefined,
  socialDBContract: undefined,
  isSigned: false,
  account: undefined
});

const NearProvider: React.FC<Props> = (
  {
    children, isSignedInit, wallet, mainContract, socialDBContract
  }: Props) => {
  const [ account, setAccount ] = useState<IUserAccount|undefined>();
  const [ isSigned, setIsSigned ] = useState<boolean>(isSignedInit);

  const loadAccount = async (): Promise<IUserAccount|undefined> => {
    if (mainContract && wallet.accountId) {
      return await mainContract.getUserInfo(wallet.accountId);
    }
  }

  useEffect(() => {
    const subscription = wallet.walletSelector?.store.observable.subscribe(
      async (nextAccounts: any) => {
        if (nextAccounts.accounts.length) {
          await wallet.onAccountChange(nextAccounts.accounts[0].accountId);
          setIsSigned(true);

          loadAccount().then(account => {
            setAccount(account);
          });
        } else {
          setIsSigned(false);
          setAccount(undefined);
        }
      });

    return () => subscription?.unsubscribe();
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