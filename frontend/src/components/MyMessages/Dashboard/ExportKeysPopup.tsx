import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { NearContext } from "../../../context/NearContext";
import { SecretChat } from "../../../services/SecretChat";
import { PrimaryButton } from "../../../assets/css/components";

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
};

const ExportKeysPopup: React.FC<Props> = ({ isOpen, setIsOpen }: Props) => {
  const near = useContext(NearContext);
  const [ keys, setKeys ] = useState("");
  const [ isCopied, setIsCopied ] = useState(false);

  useEffect(() => {
    setIsCopied(false);
    if (isOpen && near.wallet?.accountId) {
      const keysBase64 = SecretChat.getKeysForExport(near.wallet.accountId);
      if (keysBase64) {
        setKeys(keysBase64);
      }
    }
  }, [ isOpen ]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(keys).then(() => {
      setIsCopied(true);
    });
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>
          Export Account Key
        </span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <div className={"p-2 text-gray-100"}>
          <textarea value={keys} readOnly
                    className={`bg-gray-800/40 text-gray-400 text-sm w-full h-40 border border-gray-700/80 rounded-md p-4 outline-0 
                    focus:border-gray-600 mb-2`}
          />

          {isCopied && (
            <div className={"text-center text-green-400 mb-3 bg-green-900/20 pt-2 pb-1.5 rounded-md"}>
              The key is copied!
            </div>
          )}

          <div className={"flex flex-row justify-between"}>
            <div className={"text-sm opacity-50 pt-2.5"}>
              Use this text for import in another device. Keep this key safe!
            </div>
            <div className={"text-right"}>
              <PrimaryButton type="button" small="true" onClick={copyKey}>Copy Key</PrimaryButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default ExportKeysPopup;