import { ZERO_HASH } from "../constants/constants";
import { BlockChainActions, BlockChainState, BlockType } from "../types/block";
import { invalidateFollowingBlocks } from "../utils/utils";

export const initialState: BlockChainState = {
  blocks: [],
};

export const blockChainReducer = (
  state: BlockChainState,
  action: BlockChainActions
): BlockChainState => {
  switch (action.type) {

    // Handle adding a new block to the chain
    case "ADD_BLOCK": {
      const lastBlock = state.blocks[state.blocks.length - 1];
      const newBlock: BlockType = {
        blockNumber: lastBlock ? lastBlock.blockNumber + 1 : 1,
        previousHash: lastBlock ? lastBlock.hash : ZERO_HASH,
        hash: "",
      };

      return { ...state, blocks: [...state.blocks, newBlock] };
    }

    // Handle deleting the latest block
    case "DELETE_BLOCK": {
      if (state.blocks.length < 1) return state;

      return {
        ...state,
        blocks: state.blocks.slice(0, state.blocks.length - 1),
      };
    }

    // Handle updating the hash of the given block
    case "UPDATE_HASH": {
      const blockIndex = state.blocks.findIndex(
        (block) => block.blockNumber === action.blockNumber
      );

      if (blockIndex === -1) return state;

      // Update the hash of the block being mined
      const updatedBlocks = [...state.blocks];
      updatedBlocks[blockIndex] = {
        ...state.blocks[blockIndex],
        hash: action.hash,
      };

      // Invalidate all following blocks
      const finalBlocks = invalidateFollowingBlocks(
        updatedBlocks,
        blockIndex + 1
      );

      return { ...state, blocks: finalBlocks };
    }
  }
};
