interface ISocialDBContract {
  contractId: string;
  wallet: any;

  get(keys: string[]): Promise<any>;
}

export default ISocialDBContract;