import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoClose } from "react-icons/all";
import { PrimaryButton, PrimaryInput, PrimaryTextField, RadioLabel, RadioLabelText } from "../../assets/css/components";
import Loader from "../../ui/Loader";
import { Autocomplete, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { resizeFileImage, uploadMediaToIPFS } from "../../utils/media";
import { mediaURL } from "../../utils/transform";
import { useNavigate } from "react-router-dom";
import { NearContext } from "../../context/NearContext";
import { EditGroupFormData, GroupType, IGroup } from "../../types";

type Props = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  group?: IGroup
};

const EditGroupPopup: React.FC<Props> = ({ isOpen, setIsOpen, group }: Props) => {
  const navigate = useNavigate();
  const near = useContext(NearContext);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ membersLimit, setMembersLimit ] = useState(500);
  const [ isMediaLoading, setIsMediaLoading ] = useState(false);
  const [ tmpImageData, setTmpImageData ] = useState<string|null>(null);
  const [ defaultMembers, setDefaultMembers ] = useState<string[]>([]);
  const [ formData, setFormData ] = useState<EditGroupFormData>({
    title: "",
    logo: "",
    text: "",
    url: "",
    owner: "",
    moderator: "",
    group_type: "",
    members: [],
  });

  useEffect(() => {
    if (isOpen) {
      if (near.account) {
        if (near.account.level === 1) {
          setMembersLimit(2000);
        } else {
          setMembersLimit(5000);
        }
      }

      if (group) {
        setFormData({
          title: group?.title || "",
          logo: group?.image || "",
          text: group?.text || "",
          url: group?.url || "",
          owner: group?.owner || "",
          moderator: group?.moderator || "",
          group_type: group?.group_type || "",
          members: [ ...group?.members || [] ],
        });
        setDefaultMembers([ ...group?.members || [] ]);
      }
    }
  }, [ isOpen ]);

  const resetForm = () => {
    setIsLoading(false);
    setIsMediaLoading(false);
    setTmpImageData(null);
    setFormData({
      title: "",
      logo: "",
      text: "",
      url: "",
      owner: "",
      moderator: "",
      group_type: "",
      members: [],
    });
    setDefaultMembers([]);
  }

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const resizeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, logo: "" })

    const images = (e.target as HTMLInputElement).files;
    if (images) {
      resizeFileImage(images[0], 600, 600).then(blobData => {
        setIsMediaLoading(true);

        const reader = new FileReader();
        reader.readAsDataURL(blobData);
        reader.onloadend = () => {
          setTmpImageData(reader.result as string);
        }

        uploadMediaToIPFS(blobData).then(result => {
          setFormData({ ...formData, logo: result });
          setIsMediaLoading(false);
        }).catch(() => setIsMediaLoading(false));
      });
    }
  };

  const changeMemberList = (event: SyntheticEvent<Element, Event>, inputs: (string|string[])[]) => {
    setFormData({ ...formData, members: inputs as string[] });
  }

  const handleSaveGroup = (e: React.FormEvent) => {
    e.preventDefault();

    const groupExistMembers = group?.members || [];
    const newMembers = formData.members.filter(x => !groupExistMembers.includes(x));
    const removeMembers = groupExistMembers.filter(x => !formData.members.includes(x));

    if (formData.title.length < 3) {
      alert("Please provide correct group title");
      return;
    }
    if (formData.group_type === "") {
      alert("Please select group type");
      return;
    }

    const owner = group ? group.owner : near.wallet?.accountId;
    if (formData.moderator === owner) {
      alert("Don't need to add owner as moderator, it can be another account or empty field");
      return;
    }

    setIsLoading(true);

    let promiseSave;
    if (group) {
      promiseSave = near.mainContract?.editGroup(
        group.id, formData.title, formData.logo, formData.text, formData.url
      );

      if (removeMembers.length > 0) {
        near.mainContract?.ownerRemoveGroupMembers(group.id, removeMembers).then(result => {
          console.log(`result`, result);
        });
      }
      if (newMembers.length > 0) {
        near.mainContract?.ownerAddGroupMembers(group.id, newMembers).then(result => {
          console.log(`result`, result);
        });
      }
    } else {
      promiseSave = near.mainContract?.createNewGroup(
        formData.title, formData.logo, formData.text, formData.url, formData.group_type, formData.members, formData.moderator
      );
    }

    if (promiseSave) {
      promiseSave.then((resultId) => {
        if (!group) {
          navigate(`/my/group/${resultId}`);
        } else {
          // reload group data. Fix it to reload parent component data.
          document.location.reload();
        }
        setIsOpen(false);
        resetForm();
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }

  const removeGroup = () => {
    if (!group) return;

    if (confirm("Are you sure? All data and messages will be removed!")) {
      near.mainContract?.ownerRemoveGroup(group.id, group.title).then(() => {
        setIsOpen(false);
        window.document.location.href = "/my";
      });
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={"md"}
      fullWidth={true}
    >
      <DialogTitle align={"center"} className={"border-b-2 border-gray-700/30 text-gray-100"}>
        <span className={"text-gray-200/80"}>
          {!group ? ("Create New") : ("Edit My")}{" "}
          {(!formData.group_type || formData.group_type !== "Channel") ? "Group" : "Channel"}
        </span>
        <div className={"absolute right-4 top-4 opacity-80 hover:opacity-90 cursor-pointer transition text-gray-200"} onClick={handleClose}>
          <IoClose size={26}/>
        </div>
      </DialogTitle>
      <DialogContent className={"mx-2 mt-6 mb-2"}>
        <div className={"p-2 md:flex md:flex-row md:gap-8 text-gray-100"}>
          <div className={"mb-4"}>
            <label
              className={`flex w-32 h-32 md:w-40 md:h-40 items-center mx-auto bg-gray-700/40 rounded-full text-gray-400 cursor-pointer 
              hover:bg-gray-700/60 transition overflow-hidden shadow-lg ${formData.logo && ("bg-gradient-to-b from-indigo-300/90 to-blue-500/90")}`}>
              <PrimaryInput placeholder={"Logo"}
                            type={"file"}
                            accept={"image/*"}
                            className={"hidden"}
                            onChange={resizeImage}
              />

              {formData.logo ? (
                <img src={tmpImageData ? tmpImageData : mediaURL(formData.logo)}
                     alt=""
                     className={"block w-40 h-40 object-cover"}
                />
              ) : (
                <>
                  {isMediaLoading ? (
                    <div className={"w-full text-center"}>
                      <div className={"mx-auto w-8"}>
                        <Loader size={"sm"}/>
                      </div>
                      uploading
                    </div>
                  ) : (
                    <div className={"w-full text-center"}>Upload Logo</div>
                  )}
                </>
              )}
            </label>
          </div>

          <div className={"flex-1"}>
            <div className={"mb-2"}>
              <PrimaryInput placeholder={`${formData.group_type !== "Channel" ? "Group" : "Channel"} Title*`}
                            disabled={isMediaLoading}
                            value={formData.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
                              ...formData,
                              title: e.target.value
                            })}
              />
            </div>
            <div className={"mb-2"}>
              <PrimaryInput placeholder={"Description"}
                            disabled={isMediaLoading}
                            value={formData.text}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
                              ...formData,
                              text: e.target.value
                            })}
              />
            </div>

            {!group ? (
              <RadioGroup className={"mb-4 mt-4"}
                          value={formData.group_type}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
                            ...formData,
                            group_type: e.target.value as GroupType
                          })}>
                <span className={"text-gray-500 font-medium text-sm mb-1"}>Group Type*</span>
                <div className={"md:flex md:flex-row md:gap-4"}>
                  <RadioLabel className={"rounded-t-md md:w-1/3"}>
                    <FormControlLabel value="Channel"
                                      control={<Radio/>}
                                      disabled={isMediaLoading}
                                      label="Channel"
                    />
                    <RadioLabelText>
                      Broadcast messages to general public audience.
                      No participants limit, only owners write messages.
                    </RadioLabelText>
                  </RadioLabel>
                  <RadioLabel className={"rounded-b-md md:w-1/3"}>
                    <FormControlLabel value="Public"
                                      control={<Radio/>}
                                      disabled={isMediaLoading}
                                      label="Public Group"
                    />
                    <RadioLabelText>
                      Public access where anyone can join and write messages. <br/>
                      Limited by {membersLimit} members.
                    </RadioLabelText>
                  </RadioLabel>
                  <RadioLabel className={"md:w-1/3"}>
                    <FormControlLabel value="Private"
                                      control={<Radio/>}
                                      disabled={isMediaLoading}
                                      label="Private Group"
                    />
                    <RadioLabelText>
                      You manage group members, all members can write messages. <br/>
                      Limited by {membersLimit} members.
                    </RadioLabelText>
                  </RadioLabel>
                </div>
              </RadioGroup>
            ) : (
              <>
                <div className={"mb-4"}>
                  <PrimaryInput placeholder={"Website / Group URL"}
                                disabled={isMediaLoading}
                                value={formData.url}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
                                  ...formData,
                                  url: e.target.value
                                })}
                  />
                </div>
                <div className={"mb-6 mt-4"}>
                  Group type: {formData.group_type}
                  <small className={"opacity-60 ml-2"}>(can't be changed)</small>
                </div>
              </>
            )}

            {formData.group_type && formData.group_type !== "Channel" && (
              <div className={"mb-2"}>
                <Autocomplete
                  multiple
                  options={formData.members as []}
                  defaultValue={defaultMembers}
                  onChange={changeMemberList}
                  freeSolo
                  renderInput={(params) => (
                    <PrimaryTextField
                      {...params}
                      label="Members"
                      disabled={isMediaLoading}
                      placeholder="NEAR Address"
                    />
                  )}
                />
              </div>
            )}

            {!group && (
              <div className={"mb-4 md:flex md:flex-row md:gap-4"}>
                <div className={"flex-1"}>
                <span className={"text-gray-500 font-medium text-sm"}>
                  {(formData.group_type !== "Channel") ? "Group" : "Channel"} Owner
                </span>
                  <PrimaryInput disabled={true}
                                className={"text-gray-300/70"}
                                value={group ? (group as IGroup).owner : near.wallet?.accountId}
                  />
                </div>
                <div className={"flex-1"}>
                  <span className={"text-gray-500 font-medium text-sm"}>Moderator</span>
                  <PrimaryInput placeholder={"NEAR Address"}
                                disabled={isMediaLoading}
                                value={group ? (group as IGroup).moderator : formData.moderator}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({
                                  ...formData,
                                  moderator: e.target.value
                                })}
                  />
                </div>
              </div>
            )}

            <div className={"md:flex justify-between"}>
              <div className={"text-red-400/90 text-sm md:pt-4"}>
                {!group ? ("Payment 0.25 NEAR required") : (
                  <>
                    {group.owner === near.wallet?.accountId && (
                      <span onClick={() => removeGroup()}
                            className={"cursor-pointer hover:text-red-400"}>
                        Remove {(group.group_type !== "Channel") ? "Group" : "Channel"}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className={"text-right mt-4 md:mt-0"}>
                <PrimaryButton onClick={handleSaveGroup} disabled={isLoading || isMediaLoading}>
                  {!group ? ("Create") : ("Save")}{" "}
                  {(!formData.group_type || formData.group_type !== "Channel") ? "Group" : "Channel"}
                  {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                </PrimaryButton>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
};

export default EditGroupPopup;