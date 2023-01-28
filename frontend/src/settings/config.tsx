export const getSocialDBContract = (): string => {
  const contract_name = process.env.CONTRACT_NAME;
  if (contract_name && contract_name.indexOf('.near') === -1) {
    return 'v1.social08.testnet';
  }
  return 'social.near';
}

console.log(`CONTRACT_NAME`, process.env.CONTRACT_NAME);
