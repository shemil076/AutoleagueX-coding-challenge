export type BlockType = {
  blockNumber: number;
  previousHash: string;
  hash: string;
};

export interface BlockChainState {
  blocks: BlockType[];
}

export type BlockChainActions =
  | { type: "ADD_BLOCK" }
  | { type: "DELETE_BLOCK" }
  | { type: "UPDATE_HASH"; blockNumber: number; hash: string };
