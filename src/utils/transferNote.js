export const handleTransferNote = note => {
  let accountName = '';
  if (note?.includes('to')) {
    accountName = note?.split('to')?.[1];
  }
  return accountName;
};
