import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { TextareaAutosize, TextField } from "@mui/material";
import { PrimaryButton, PrimaryInput, PrimaryTextarea } from "../../assets/css/components";

export const NewPrivateMessagePopup = ({ isOpen, setIsOpen }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ messageAddress, setMessageAddress ] = useState("");
  const [ messageText, setMessageText ] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>New Message</span>
        <div className={"absolute right-4 top-4 opacity-70 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <div className={"p-2"}>
          <div className={"mb-3"}>
            <PrimaryInput placeholder={"NEAR Address"}
                          value={messageAddress}
                          onChange={(e) => setMessageAddress(e.target.value)}/>
          </div>
          <div className={"mb-3"}>
            <PrimaryTextarea placeholder="Message text"
                             maxRows={10}
                             minRows={3}
                             disabled={isLoading}
                             value={messageText}
                             onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          <div className={"text-right"}>
            <PrimaryButton>Send Message</PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}