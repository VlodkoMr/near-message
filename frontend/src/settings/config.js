export const SOCIAL_DB_CONTRACT = process.env.CONTRACT_NAME.indexOf('.near') === -1 ? 'v1.social08.testnet' : 'social.near';

console.log(`CONTRACT_NAME`, process.env.CONTRACT_NAME);
