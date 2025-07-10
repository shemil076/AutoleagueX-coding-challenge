import React, { useState } from "react";

import Block from "../Block";

import styles from "./styles.module.css";
import sha256 from "sha256";

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {
  // Contains all blocks
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const blocksCount = blocks.length;

  /**
   * Complete this function
   * onAdd should create a new block
   */
  const onAdd = () => {
    const lastBlock = blocks[blocksCount - 1];
    const newBlock: BlockType = {
      blockNumber: lastBlock ? lastBlock.blockNumber + 1 : 1,
      previousHash: lastBlock ? lastBlock.hash : "0".repeat(64),
      hash: "",
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  /**
   * Complete this function
   * onDelete should delete the last block
   * Should only need to pass to the last block
   */
  const onDelete = () => {
    if (blocksCount < 1) return;
    const remainingBlocks = blocks.slice(0, blocksCount - 1);
    setBlocks(remainingBlocks);
  };

  /**
   * Complete this function
   * onHash should update the corresponding index in the state 'hashes'
   * E.g., block 1 should update its corresponding index in the state 'hashes'
   */
  const onHash = (_block: number, hash: string) => {
    const blockIndex = blocks.findIndex(
      (block) => block.blockNumber === _block
    );
    if (blockIndex === -1) return;

    // Update the hash of the block being mined
    const updatedBlocks = [...blocks];
    updatedBlocks[blockIndex] = { ...blocks[blockIndex], hash };

    // Invalidate all following blocks
    for (let i = blockIndex + 1; i < updatedBlocks.length; i++) {
      const previousBlock = updatedBlocks[i - 1];
      const currentBlock = updatedBlocks[i];

      // Dummy hash avoids empty hash display in UI.
      const dummyHash = sha256(
        currentBlock.blockNumber + previousBlock.hash + i
      );
      updatedBlocks[i] = {
        ...updatedBlocks[i],
        previousHash: previousBlock.hash,
        hash: dummyHash,
      };
    }

    setBlocks(updatedBlocks);
  };

  /**
   * Fix the return statement
   * Currently we only show one block, this is incorrect.
   * We need to be able to show multiple blocks as a block chain should.
   * You'll most likely need to add more functions or states to fix the render. Figure out a way you can go about this.
   * Total Blocks is also incorrect.
   */
  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {blocksCount}</div>
      <div className={styles.blockContainer}>
        {blocks.map((block, index) => (
        <Block
          block={block.blockNumber}
          hash={block.hash}
          onHash={onHash}
          previousHash={block.previousHash}
          onDelete={index === blocksCount - 1 ? onDelete : undefined}
          key={`block-${index}`}
        />
      ))}
      </div>
      <button type="button" onClick={() => onAdd()}>
        Add Block
      </button>
    </div>
  );
};

export default BlockChain;
