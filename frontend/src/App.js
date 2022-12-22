import { lazy, useContext, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, Error404, Privacy, Terms, MyDashboard, MyPrivateChat, MyGroupChat } from "./pages";
import { NearContext } from "./context/NearContext";
import { PublicCommunities } from "./pages/PublicCommunities";
import { FAQ } from "./pages/FAQ";

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
              <Route exact path="/my" element={<MyMessagesLayout/>}>
                <Route exact path="" element={<MyDashboard/>}/>
                <Route exact path="account/:id" element={<MyPrivateChat/>}/>
                <Route exact path="group/:id" element={<MyGroupChat/>}/>
              </Route>
            </Route>

            <Route exact path="/public-communities" element={<PublicCommunities/>}/>
            <Route exact path="/terms" element={<Terms/>}/>
            <Route exact path="/privacy" element={<Privacy/>}/>
            <Route exact path="/faq" element={<FAQ/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}