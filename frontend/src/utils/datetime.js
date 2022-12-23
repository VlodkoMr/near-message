export const timestampToDate = (timestamp, format = 'short') => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: format,
    }).format(date);
  }
}

export const timestampToTime = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).format(date);
  }
}