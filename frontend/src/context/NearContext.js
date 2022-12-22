import { createContext, useEffect, useState } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, isSignedInit, wallet, mainContract, socialDBContract }) => {
  const [account, setAccount] = useState(wallet.accountId);
  const [isSigned, setIsSigned] = useState(isSignedInit);

  const loadAccount = async () => {
    return await mainContract.getUserInfo(wallet.accountId);
  }

  useEffect(() => {
    const subscription = wallet.walletSelector.store.observable.subscribe(async (nextAccounts) => {
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
}