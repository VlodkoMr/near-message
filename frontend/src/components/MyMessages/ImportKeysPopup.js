import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { SecretChat } from "../../utils/secret-chat";
import { PrimaryButton, SecondaryButton } from "../../assets/css/components";

export const ImportKeysPopup = ({ isOpen, setIsOpen }) => {
  const near = useContext(NearContext);
  const [keyText, setKeyText] = useState("");
  const [isImported, setIsImported] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const importKey = () => {
    if (keyText.length) {
      const importResult = SecretChat.importKeys(near.wallet.accountId, keyText);
      if (importResult) {
        setIsImported(true);
      }
    } else {
      alert("Please add your account key");
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>
          Import Account Key
        </span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>

        {isImported ? (
          <div className={"p-2 text-gray-100 text-center"}>
            <p className={"mb-4"}>Account keys successfully imported.</p>
            <SecondaryButton type="button" small="true" onClick={handleClose}>
              Close
            </SecondaryButton>
          </div>
        ) : (
          <div className={"p-2 text-gray-100"}>
            <textarea value={keyText}
                      onChange={(e) => setKeyText(e.target.value)}
                      className={`bg-gray-800/40 text-gray-400 text-sm w-full h-40 border border-gray-700/80 rounded-md p-4 outline-0 
                      focus:border-gray-600 mb-2`}
            />

            <div className={"flex flex-row justify-between"}>
              <div className={"text-sm opacity-50 pt-2.5"}>
                NOTE: Existing key will be replaced.
              </div>
              <div className={"text-right"}>
                <PrimaryButton type="button" small="true" onClick={() => importKey()}>
                  Import Key
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}