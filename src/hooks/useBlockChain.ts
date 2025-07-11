import { useCallback, useMemo, useReducer } from "react";
import { blockChainReducer, initialState } from "../reducers/blockChainReducer";

export const useBlockChain = () => {
  const [state, dispatch] = useReducer(blockChainReducer, initialState);

  // Avoid recalculating the count unless the blocks get changed
  const blockCount = useMemo(() => state.blocks.length, [state.blocks]);

  const onAdd = useCallback(() => {
    dispatch({ type: "ADD_BLOCK" });
  }, []);

  const onDelete = useCallback(() => {
    dispatch({ type: "DELETE_BLOCK" });
  }, []);

  const onHash = useCallback((blockNumber: number, hash: string) => {
    dispatch({ type: "UPDATE_HASH", blockNumber, hash });
  }, []);

  return { state, blockCount, onAdd, onDelete, onHash };
};
