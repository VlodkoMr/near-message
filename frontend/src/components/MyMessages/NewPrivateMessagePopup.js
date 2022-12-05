import React, { useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { PrimaryButton, PrimaryTextarea, PrimaryTextField, SecondaryButton } from "../../assets/css/components";
import { Loader } from "../Loader";
import { NearContext } from "../../context/NearContext";
import { useNavigate } from "react-router-dom";
import { getPrivateChatId, postRequest } from "../../utils/requests";
import { loadSocialProfiles } from "../../utils/transform";
import { Autocomplete } from "@mui/material";

export const NewPrivateMessagePopup = ({ isOpen, setIsOpen, setReloadChatList }) => {
  const navigate = useNavigate();
  const near = useContext(NearContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [canOpenChat, setCanOpenChat] = useState(false);
  const [messageAddress, setMessageAddress] = useState("");
  const [messageText, setMessageText] = useState("");
  const [contactsList, setContactsList] = useState([]);

  const loadFollowingList = () => {
    const accountId = near.wallet.accountId;
    try {
      postRequest(`${process.env.NEAR_SOCIAL_API_URL}/keys`, {
        keys: [`*/graph/follow/${accountId}`]
      }).then(contacts => {
        let addressList = Object.keys(contacts);
        if (addressList.length) {
          loadSocialProfiles(addressList, near).then(profiles => {
            let profileResults = Object.values(profiles).map(p => {
              if (p.name) {
                return `${p.name} (${p.id})`;
              } else {
                return p.id;
              }
            });
            profileResults.sort();
            setContactsList(profileResults);
          });
        }
      });
    } catch (e) {
      console.log(`NEAR_SOCIAL_API Error`, e);
    }
  }

  useEffect(() => {
    resetForm();
    if (isOpen) {
      loadFollowingList();
    }
  }, [isOpen]);

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
    near.mainContract.sendPrivateMessage(messageText, "", messageAddress, "", "", 0)
      .then(() => {
        setIsMessageSent(true);

        setTimeout(() => {
          setCanOpenChat(true);
          setReloadChatList(+new Date());
        }, 3000);
      })
      .catch(e => {
        console.log(e);
        alert('Error: Message not sent');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const resetForm = () => {
    setIsLoading(false);
    setIsMessageSent(false);
    setCanOpenChat(false);
    setMessageAddress("");
    setMessageText("");
  }

  const openChat = (e) => {
    e.preventDefault();
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
            <div className={"text-xl mb-8 mt-4 font-medium"}>Message successfully sent.</div>
            <div>
              <PrimaryButton disabled={!canOpenChat} onClick={(e) => openChat(e)}>
                {canOpenChat ? ("Open Chat") : ("Loading Chats...")}
              </PrimaryButton>
              <SecondaryButton className={"ml-4"} onClick={() => resetForm()}>
                New Message
              </SecondaryButton>
            </div>
          </div>
        ) : (
          <div className={"p-2"}>
            <div className={"mb-3"}>
              <Autocomplete
                options={contactsList}
                onChange={(event, input) => setMessageAddress(input)}
                onKeyUp={(event) => setMessageAddress(event.target.value)}
                freeSolo
                renderInput={(params) => (
                  <PrimaryTextField
                    {...params}
                    label="Recipient"
                    placeholder="NEAR Address"
                  />
                )}
              />
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