export const timestampToDate = (timestamp: number|null, isLong: boolean = false): string|undefined => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: isLong ? "long" : "short"
    }).format(date);
  }
}

export const timestampToTime = (timestamp: number|null): string|undefined => {
  if (timestamp) {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).format(date);
  }
}