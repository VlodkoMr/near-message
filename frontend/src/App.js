import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, MyDashboard, MyGroupChat, MyMessagesLayout, MyPrivateChat, Error404, Docs } from "./pages";
import { NearContext } from "./context/NearContext";

export const App = () => {
  const near = useContext(NearContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>

          <Route exact path="/my" element={<MyMessagesLayout/>}>
            <Route exact path="" element={<MyDashboard/>}/>
            <Route exact path="account/:id" element={<MyPrivateChat/>}/>
            <Route exact path="group/:id" element={<MyGroupChat/>}/>
          </Route>

          <Route exact path="/docs" element={<Docs/>}/>
          <Route path='*' element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}


// import 'regenerator-runtime/runtime';
// import React from 'react';
//
// import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
//
//
// export default function App({ isSignedIn, helloNEAR, wallet }) {
//   const [ valueFromBlockchain, setValueFromBlockchain ] = React.useState();
//
//   const [ uiPleaseWait, setUiPleaseWait ] = React.useState(true);
//
//   // Get blockchian state once on component load
//   React.useEffect(() => {
//     helloNEAR.getGreeting()
//       .then(setValueFromBlockchain)
//       .catch(alert)
//       .finally(() => {
//         setUiPleaseWait(false);
//       });
//   }, []);
//
//   /// If user not signed-in with wallet - show prompt
//   if (!isSignedIn) {
//     // Sign-in flow will reload the page later
//     return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
//   }
//
//   function changeGreeting(e) {
//     e.preventDefault();
//     setUiPleaseWait(true);
//     const { greetingInput } = e.target.elements;
//     helloNEAR.setGreeting(greetingInput.value)
//       .then(async () => {
//         return helloNEAR.getGreeting();
//       })
//       .then(setValueFromBlockchain)
//       .finally(() => {
//         setUiPleaseWait(false);
//       });
//   }
//
//   return (
//     <>
//       <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
//       <main className={uiPleaseWait ? 'please-wait' : ''}>
//         <h1>
//           The contract says: <span className="greeting">{valueFromBlockchain}</span>
//         </h1>
//         <form onSubmit={changeGreeting} className="change">
//           <label>Change greeting:</label>
//           <div>
//             <input
//               autoComplete="off"
//               defaultValue={valueFromBlockchain}
//               id="greetingInput"
//             />
//             <button>
//               <span>Save</span>
//               <div className="loader"></div>
//             </button>
//           </div>
//         </form>
//         <EducationalText/>
//       </main>
//     </>
//   );
// }
