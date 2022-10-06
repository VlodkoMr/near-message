// React
import React from 'react';
import ReactDOM from 'react-dom/client'
import { NearProvider } from "./src/context/NearContext";
import { Wallet } from "./src/utils/near-wallet";
import { MainContract } from "./src/interfaces/mainContract";
import { App } from './src/App';

const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })
const mainContract = new MainContract({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet })

// Setup on page load
window.onload = async () => {
  const isSigned = await wallet.startUp()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <NearProvider wallet={wallet} mainContract={mainContract} isSigned={isSigned}>
      <App/>
    </NearProvider>
  )
}