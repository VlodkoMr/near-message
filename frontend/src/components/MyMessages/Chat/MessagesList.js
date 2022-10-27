import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../../../context/NearContext";
import { Avatar } from "../../Common/Avatar";
import { formatAddress } from "../../../utils/transform";
import { Link, useOutletContext } from "react-router-dom";
import { CircleButton, SecondaryButton } from "../../../assets/css/components";
import { EditGroupPopup } from "../EditGroupPopup";
import {
  AiOutlineInfo,
  AiOutlineShareAlt,
  AiOutlineUsergroupAdd, BsInfo,
  FaInfo, HiOutlineInformationCircle,
  IoIosInformation,
  IoIosShareAlt,
  MdEdit,
  TiInfoLarge, TiInfoLargeOutline
} from "react-icons/all";
import { SharePopup } from "./SharePopup";
import { OneMessage } from "./OneMessage";

export const MessagesList = ({
  messages,
  historyMessages,
  tmpMessages,
  messagesPerPage,
  setReplyToMessage,
  opponent,
  opponentAddress,
  userProfiles
}) => {

  const isLastMessage = (message, index) => {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  }

  useEffect(() => {
    console.log(`opponent`, opponent);
  }, []);

  return (
    <>
      {messages.length >= messagesPerPage && (
        <div className={"w-40 mx-auto text-center"}>
          <SecondaryButton small className={"w-full"}>
            load previous
          </SecondaryButton>
        </div>
      )}

      {historyMessages.map(message => (
          <OneMessage message={message}
                      key={message.id}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={false}
          />
        )
      )}

      {messages.map((message, index) => (
          <OneMessage message={message}
                      key={message.id}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={isLastMessage(message, index)}
          />
        )
      )}

      {tmpMessages.length > 0 && tmpMessages.filter(tmp => tmp.to_address === opponentAddress).map(tmpMessage => (
          <OneMessage message={tmpMessage}
                      key={tmpMessage.id}
                      opponent={opponent}
                      isLast={true}
          />
        )
      )}
    </>
  )
}

