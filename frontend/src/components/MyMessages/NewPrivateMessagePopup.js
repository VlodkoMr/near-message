import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { PrimaryButton, PrimaryInput, PrimaryTextarea, SecondaryButton } from "../../assets/css/components";
import { Loader } from "../Loader";
import { NearContext } from "../../context/NearContext";
import { useNavigate } from "react-router-dom";
import { getPrivateChatId } from "../../utils/requests";

export const NewPrivateMessagePopup = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const near = useContext(NearContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isMessageSent, setIsMessageSent ] = useState(false);
  const [ messageAddress, setMessageAddress ] = useState("");
  const [ messageText, setMessageText ] = useState("");

  useEffect(() => {
    resetForm();
  }, [ isOpen ]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (messageAddress.length < 4) {
      alert("Wrong destination address");
      return false;
    }
    if (messageText.length < 2) {
      alert("Please add message text");
      return false;
    }

    setIsLoading(true);
    near.mainContract.sendPrivateMessage(messageText, "", messageAddress, "")
      .then(() => {
        setIsMessageSent(true);
      })
      .catch(e => {
        console.log(e);
        alert('Error: Message not sent');
      })
      .finally(() => {
        console.log(`finally`);
        setIsLoading(false);
      });
  }

  const resetForm = () => {
    setIsLoading(false);
    setIsMessageSent(false);
    setMessageAddress("");
    setMessageText("");
  }

  const openChat = () => {
    let chatId = getPrivateChatId(near.wallet.accountId, messageAddress);
    navigate(`/my/account/${chatId}`);
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>New Message</span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>

        {isMessageSent ? (
          <div className={"text-center text-gray-100 p-2"}>
            <div className={"text-xl mb-4 font-medium"}>Message successfully sent!</div>
            <div>
              <PrimaryButton onClick={() => openChat()}>
                Open Chat
              </PrimaryButton>
              <SecondaryButton className={"ml-4"} onClick={() => resetForm()}>
                New Message
              </SecondaryButton>
            </div>
          </div>
        ) : (
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
              <PrimaryButton onClick={handleSendMessage}
                             disabled={isLoading}>
                Send Message
                {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
              </PrimaryButton>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}