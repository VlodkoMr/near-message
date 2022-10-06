import { useContext } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, MyDashboard, MyGroupChat, MyMessagesLayout, MyPrivateChat, Error404, Docs } from "./pages";
import { NearContext } from "./context/NearContext";

export const App = () => {
  const near = useContext(NearContext);

  const ProtectedRoute = () => {
    if (!near.isSigned) {
      return <Navigate to="/" replace/>;
    }
    return <Outlet/>;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route exact path="/my" element={<MyMessagesLayout/>}>
              <Route exact path="" element={<MyDashboard/>}/>
              <Route exact path="account/:id" element={<MyPrivateChat/>}/>
              <Route exact path="group/:id" element={<MyGroupChat/>}/>
            </Route>
          </Route>

          <Route exact path="/docs" element={<Docs/>}/>
          <Route path='*' element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}