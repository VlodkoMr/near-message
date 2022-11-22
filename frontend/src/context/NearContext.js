import { createContext, useEffect, useState } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, wallet, isSigned, mainContract, socialDBContract }) => {
  const [account, setAccount] = useState();

  const loadAccount = async () => {
    return await mainContract.getUserInfo(wallet.accountId);
  }

  useEffect(() => {
    console.log(`wallet.accountId`, wallet.accountId);
    if (wallet.accountId) {
      loadAccount().then(account => {
        setAccount(account);
      });
    }
  }, [wallet.accountId]);

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