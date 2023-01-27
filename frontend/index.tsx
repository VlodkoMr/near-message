import { createRoot } from 'react-dom/client';
import { Wallet } from "./src/utils/near-wallet";
import { SOCIAL_DB_CONTRACT } from "./src/settings/config";
import NearProvider from "./src/context/NearContext";
import MainContract from "./src/interfaces/mainContract";
import SocialDBContract from "./src/interfaces/socialDBContract";

import App from './src/App';

// Setup on page load
window.onload = async () => {
  const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME, network: process.env.NEAR_NETWORK })
  const mainContract = new MainContract({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet })
  const socialDBContract = new SocialDBContract({ contractId: SOCIAL_DB_CONTRACT, walletToUse: wallet })

  const isSigned = await wallet.startUp()

  createRoot(document.getElementById('root')).render(
    <NearProvider
      wallet={wallet}
      isSignedInit={isSigned}
      mainContract={mainContract}
      socialDBContract={socialDBContract}
    >
      <App/>
    </NearProvider>
  )
}