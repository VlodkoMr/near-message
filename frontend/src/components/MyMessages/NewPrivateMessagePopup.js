import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";

export const NewPrivateMessagePopup = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle align={"center"} className={"border-b"}>
        <span>New Message</span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-100 cursor-pointer"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <p>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </p>
      </DialogContent>
    </Dialog>
  )
}