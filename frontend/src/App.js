import { lazy, useContext, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, Error404, Privacy, Terms, MyDashboard, MyPrivateChat, MyGroupChat } from "./pages";
import { NearContext } from "./context/NearContext";
import { PublicCommunities } from "./pages/PublicCommunities";
import { Faq } from "./pages/Faq";

export const App = () => {
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

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={loadingFallback()}>
          <Routes>
            <Route exact path="/" element={<Home/>}/>

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