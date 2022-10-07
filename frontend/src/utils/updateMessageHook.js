import React from "react";

export default function useLoadMessages(lastId = null) {
  const [isCopied, setCopied] = React.useState(false);

  function handleCopy(text) {
    // if (typeof text === "string" || typeof text == "number") {
    //   copy(text.toString());
    //   setCopied(true);
    // } else {
    //   setCopied(false);
    //   console.error(
    //     `Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`
    //   );
    // }
  }

  return [isCopied, handleCopy];
}