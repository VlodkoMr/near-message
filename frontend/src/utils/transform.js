export const transformMessages = (messages, accountId) => {
  let lastMessageUser;

  return messages.map((message, index) => {
    message.isFirst = lastMessageUser !== message.from_user.id;
    message.isMy = message.from_user.id === accountId;
    message.isLast = !messages[index + 1] || messages[index + 1].from_user.id !== message.from_user.id;
    message.isTemporary = false;

    lastMessageUser = message.from_user.id;
    console.log(`message`, message);
    return message;
  });
}

export const generateTemporaryMessage = (id, text, media, accountId, toUser) => {
  let tmpMessage = {
    created_at: new Date() / 1000,
    from_user: { id: accountId, media: null },
    id: id,
    isFirst: true,
    isLast: true,
    isMy: true,
    isTemporary: true,
    text,
    media,
  };

  if (toUser) {
    console.log(`toUser`, toUser);
    tmpMessage['to_user'] = toUser;
  }

  return tmpMessage;
}