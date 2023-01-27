import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { PrimaryButton } from "../../../assets/css/components";

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  group: IGroup
};

const SharePopup: React.FC<Props> = ({ isOpen, setIsOpen, group }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      setUrl(`${process.env.APP_URL}my/group/${group.id}`);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>
          Share {group.group_type !== "Channel" ? "Group" : "Channel"}
        </span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <div className={"p-2 gap-8 text-gray-100"}>
          <div>
            <input value={url}
                   readOnly
                   type="text"
                   className={`bg-gray-800/40 text-gray-400 text-sm w-full border border-gray-700/80 rounded-md p-3 outline-0 mb-4`}
            />
          </div>

          {isCopied && (
            <div className={"text-center text-green-400 mb-3 bg-green-900/20 pt-2 pb-1.5 rounded-md"}>
              The URL is copied!
            </div>
          )}
          <div className={"text-center"}>
            <PrimaryButton type="button" small="true" onClick={copyURL}>Copy URL</PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default SharePopup;