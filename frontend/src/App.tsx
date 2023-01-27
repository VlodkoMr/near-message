import React, { lazy, useContext, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { NearContext } from "./context/NearContext";
import Home from "./pages/Home";
import MyDashboard from "./pages/MyMessages/MyDashboard";
import MyPrivateChat from "./pages/MyMessages/MyPrivateChat";
import MyGroupChat from "./pages/MyMessages/MyGroupChat";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Error404 from "./pages/Error404";
import Faq from "./pages/Faq";
import PublicCommunities from "./pages/PublicCommunities";

const App: React.FC = () => {
  const near = useContext(NearContext);

  const ProtectedRoute = () => {
    if (!near.isSigned) {
      return <Navigate to="/" replace/>;
    }
    return <Outlet/>;
  };

  const MyMessagesLayout = lazy(() => import("./pages/MyMessages/MyMessagesLayout"))

  const loadingFallback = () => (
    <small>...</small>
  )

  useEffect(() => {
    // Check timezone and redirect to Terms & Conditions
    const disabledTimezones = [
      'Europe/Moscow', 'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk',
      'Asia/Vladivostok', 'Asia/Sakhalin', 'Asia/Magadan', 'Asia/Kamchatka', 'Asia/Anadyr', 'Asia/Tehran', 'Europe/Minsk'
    ];
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (disabledTimezones.includes(timezone) && location.pathname !== '/terms') {
        alert(`Sorry, you can't use this app based on our Terms & Conditions.`);
        window.location.href = '/terms';
      }
    } catch (e) {
      console.log(`Timezone error: ${e}`);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={loadingFallback()}>
          <Routes>
            <Route path="/" element={<Home/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path="/my" element={<MyMessagesLayout/>}>
                <Route path="" element={<MyDashboard/>}/>
                <Route path="account/:id" element={<MyPrivateChat/>}/>
                <Route path="group/:id" element={<MyGroupChat/>}/>
              </Route>
            </Route>

            <Route path="/public-communities" element={<PublicCommunities/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/privacy" element={<Privacy/>}/>
            <Route path="/faq" element={<Faq/>}/>

            <Route path='*' element={<Error404/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;