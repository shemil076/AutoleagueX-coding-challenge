import React from "react";

import Block from "../Block";

import styles from "./styles.module.css";

import { useBlockChain } from "../../hooks/useBlockChain";

/**
 * Block Chain Component
 * This component adds, delete and contains the hashes for the block chain
 * A single block is already done
 */
const BlockChain = () => {
  const { state, blockCount, onAdd, onDelete, onHash } = useBlockChain();

  return (
    <div className={styles.blockChain}>
      <h1>Block Chain Demo</h1>
      <div>Total Blocks: {blockCount}</div>
      <div className={styles.blockContainer}>
        {state.blocks.map((block, index) => (
          <Block
            block={block.blockNumber}
            hash={block.hash}
            onHash={onHash}
            previousHash={block.previousHash}
            onDelete={index === blockCount - 1 ? onDelete : undefined}
            key={`block-${block.blockNumber}`}
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
