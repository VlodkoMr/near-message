import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { PrimaryButton, SecondaryButton } from "../../../assets/css/components";

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  setAttachedTokens: (attachedTokens: number) => void
};

const AttachTokenPopup: React.FC = ({ isOpen, setIsOpen, setAttachedTokens }: Props) => {
  const [attachedAmount, setAttachedAmount] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
  };

  const cancelAttach = () => {
    setAttachedTokens(0);
    handleClose();
  }

  const handleAttach = () => {
    setAttachedTokens(parseFloat(attachedAmount));
    handleClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>
          Attach NEAR Tokens
        </span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <div className={"p-2 text-gray-100"}>
          <div className={"flex flex-row"}>
            <input type={"number"}
                   value={attachedAmount}
                   step={0.1}
                   min={0.1}
                   onChange={(e) => setAttachedAmount(e.target.value)}
                   className={`bg-gray-800/40 text-gray-400 text-sm w-full border border-gray-700/80 rounded-l-md p-4 outline-0 
                    focus:border-gray-600 mb-2`}
            />
            <span
              className={"w-24 py-3.5 font-semibold text-center px-6 mb-2 bg-gray-800/40 text-gray-500 rounded-r-md border border-gray-700/80 border-l-0"}>NEAR</span>
          </div>

          <div className={"flex flex-row justify-between mt-1"}>
            <div className={"text-right"}>
              <SecondaryButton type="button" small="true" onClick={cancelAttach}>Cancel Deposit</SecondaryButton>
            </div>
            <div className={"text-right"}>
              <PrimaryButton type="button" small="true" onClick={handleAttach}>Attach Deposit</PrimaryButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default AttachTokenPopup;