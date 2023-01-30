import { createRoot } from 'react-dom/client';
import { Wallet } from "./src/services/nearWallet";
import NearProvider from "./src/context/NearContext";
import MainContract from "./src/contracts/mainContract";
import SocialDBContract from "./src/contracts/socialDBContract";

import App from './src/App';

// Setup on page load
window.onload = async () => {
  const wallet = new Wallet({
    createAccessKeyFor: process.env.CONTRACT_NAME,
    network: process.env.NEAR_NETWORK
  });
  const mainContract = new MainContract({
    contractId: process.env.CONTRACT_NAME,
    walletToUse: wallet
  });
  const socialDBContract = new SocialDBContract({
    contractId: SocialDBContract.getContractAddress(),
    walletToUse: wallet
  });

  const isSigned = await wallet.startUp();

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