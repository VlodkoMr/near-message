import React from 'react';
import ReactDOM from 'react-dom/client'
import { NearProvider } from "./src/context/NearContext";
import { Wallet } from "./src/utils/near-wallet";
import { MainContract } from "./src/interfaces/mainContract";
import { SocialDBContract } from "./src/interfaces/socialDBContract";
import { SOCIAL_DB_CONTRACT } from "./src/settings/config";
import { App } from './src/App';

// Setup on page load
window.onload = async () => {
  const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME, network: process.env.NEAR_NETWORK })
  const mainContract = new MainContract({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet })
  const socialDBContract = new SocialDBContract({ contractId: SOCIAL_DB_CONTRACT, walletToUse: wallet })

  let isSigned = await wallet.startUp()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <NearProvider
      wallet={wallet}
      mainContract={mainContract}
      socialDBContract={socialDBContract}
      isSigned={isSigned}
    >
      <App/>
    </NearProvider>
  )
}