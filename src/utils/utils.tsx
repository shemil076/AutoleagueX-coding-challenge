import sha256 from "sha256";
import { BlockType } from "../types/block";


/***
 * Recursively invalidate remaining blocks after the given index
 */
export const invalidateFollowingBlocks = (
  blocks: BlockType[],
  startIndex: number
): BlockType[] => {
  if (startIndex >= blocks.length) return blocks;

  const updatedBlocks = [...blocks];
  const previousBlock = updatedBlocks[startIndex - 1];
  const currentBlock = updatedBlocks[startIndex];

  // Dummy hash avoids empty hash display in UI.
  const dummyHash = sha256(
    currentBlock.blockNumber + previousBlock.hash + startIndex
  );

  updatedBlocks[startIndex] = {
    ...currentBlock,
    previousHash: previousBlock.hash,
    hash: dummyHash,
  };

  return invalidateFollowingBlocks(updatedBlocks, startIndex + 1);
};
