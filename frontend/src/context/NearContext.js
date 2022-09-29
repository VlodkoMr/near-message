import { createContext } from "react";

export const NearContext = createContext({});

export const NearProvider = ({ children, wallet, isSigned, mainContract }) => {

  return (
    <NearContext.Provider value={{
      wallet,
      mainContract,
      isSigned
    }}>
      {children}
    </NearContext.Provider>
  )
}