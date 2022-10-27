import { createContext, useEffect } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, wallet, isSigned, mainContract, socialDBContract }) => {
  const loadAccount = async () => {
    return await mainContract.getUserInfo(wallet.accountId);
  }

  useEffect(() => {
    if (wallet.accountId) {
      loadAccount().then(account => {
        console.log(`init account`, account);
        // if (account) {
        //   if (account.level === 1) {
        //     setMembersLimit(2000);
        //   } else {
        //     setMembersLimit(5000);
        //   }
        // }
      });
    }
  }, [wallet.accountId])

  return (
    <NearContext.Provider value={{
      wallet,
      mainContract,
      socialDBContract,
      isSigned,
    }}>
      {children}
    </NearContext.Provider>
  )
}