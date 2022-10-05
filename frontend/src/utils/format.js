export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export const timestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);
}