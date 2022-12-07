import { createContext, useEffect, useState } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, wallet, mainContract, socialDBContract }) => {
  const [account, setAccount] = useState();
  const [isSigned, setIsSigned] = useState(false);

  const loadAccount = async () => {
    return await mainContract.getUserInfo(wallet.accountId);
  }

  useEffect(() => {
    const subscription = wallet.walletSelector.store.observable.subscribe(async (nextAccounts) => {
      if (nextAccounts.accounts.length) {
        wallet.accountId = nextAccounts.accounts[0].accountId;
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