export const transformMessages = (messages, accountId) => {
  let lastMessageUser;

  return messages.map((message, index) => {
    message.isFirst = lastMessageUser !== message.from_user.id;
    message.isMy = message.from_user.id === accountId;
    message.isLast = !messages[index + 1] || messages[index + 1].from_user.id !== message.from_user.id;

    lastMessageUser = message.from_user.id;
    console.log(`message`, message);
    return message;
  });
}