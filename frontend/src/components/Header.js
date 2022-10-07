import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { NearContext } from "../context/NearContext";

export const Header = () => {
  const near = useContext(NearContext);

  return (
    <header className={"flex flex-row justify-between"}>
      <h1>header</h1>

      {!near.isSigned ? (
        <Button onClick={() => near.wallet.signIn()}>signIn</Button>
      ) : (
        <Button onClick={() => near.wallet.signOut()}>signOut {near.wallet.accountId}</Button>
      )}
    </header>
  );
};
