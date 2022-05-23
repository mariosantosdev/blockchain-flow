export type Block = {
  header: {
    nonce: number;
    hash: string;
  };
  body: {
    id: number;
    timestamp: number;
    data: any;
    previousHash: string;
  };
};
