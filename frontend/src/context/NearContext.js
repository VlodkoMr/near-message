import { createContext } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, wallet, isSigned, mainContract, socialDBContract }) => {
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