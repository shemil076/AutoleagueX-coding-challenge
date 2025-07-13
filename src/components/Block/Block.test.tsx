import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Block from './';
import { ZERO_HASH } from '../../constants/constants';
import sha256 from 'sha256';

/**
 * Block Testing
 * Please Complete these tests
 */

/**
 * Hash is set on load
 * We need to check that when component is rendered, 
 * onHash is called and the hash change is reflected in the component
 */
it('Hash is set on load', () => {
  const mockOnHash = jest.fn();

  const blockNumber = 1;
  const previousHash = ZERO_HASH;
  const nonce = 0;
  const data = '';
  const expectedHash = sha256(blockNumber + data + previousHash + nonce);

  const { getByText } = render(<Block block={blockNumber} previousHash={previousHash} hash={expectedHash} onHash={mockOnHash}/>);

  expect(mockOnHash).toHaveBeenCalledTimes(1);
  expect(mockOnHash).toHaveBeenCalledWith(blockNumber, expectedHash);

  expect(getByText(expectedHash)).toBeInTheDocument();

});

/**
 * Shows not valid text
 * On render, the text 'Not Valid' should be in the document as the hash is not valid
 */
it("Shows not valid text", () => {
  const invalidHash = 'invalidHash';

  const { getByText } = render(<Block block={0} previousHash={ZERO_HASH} hash={invalidHash} onHash={() => {}}/>);

  expect(getByText("Not Valid")).toBeInTheDocument();

});

/**
 * Delete is called correctly
 * We need to make sure that when clicking on delete, the delete function is called
 */
it("Delete is called correctly", () => {
  const mockOnDelete = jest.fn();

  const { getByText } = render(<Block block={1} hash={ZERO_HASH} onHash={() => {}} onDelete={mockOnDelete}/>);

  userEvent.click(getByText("Delete"));

  expect(mockOnDelete).toHaveBeenCalledTimes(1);
});

/**
 * Mining works correctly
 * We need to be able to click on mine and expect the block hash to now be valid
 * The text 'Valid' should also be in the document
 */
it("Mining works correctly", () => {
  const mockOnHash = jest.fn();

  const blockNumber = 1;
  const previousHash = ZERO_HASH;
  const nonce = 0;
  const data = '';
  const initialHash = sha256(blockNumber + data + previousHash + nonce);

   const { getByText } = render(<Block block={blockNumber} hash={initialHash} onHash={mockOnHash}/>);
   fireEvent.click(getByText("Mine"));
   const minedCall = mockOnHash.mock.calls.find(([block, hash]) => block === blockNumber && hash.startsWith("000"));

   expect(minedCall).toBeTruthy();
   const [_, minedHash] = minedCall;

   render(<Block block={blockNumber} previousHash={previousHash} hash={minedHash} onHash={mockOnHash}/>)

   expect(getByText("Valid")).toBeInTheDocument();

});

/**
 * Changing data effects hash
 * The data textarea can be change, 
 * we need to make sure the changes effect the hash and that onHash is called
 */
it("Changing data effects hash", () => {
 const mockOnHash = jest.fn();
    const blockNumber = 1;
    const previousHash = ZERO_HASH;
    const initialNonce = 0;
    const initialData = '';
    const initialHash = sha256(blockNumber + initialData + previousHash + initialNonce);

    const { getByLabelText } = render(
      <Block block={blockNumber} previousHash={previousHash} hash={initialHash} onHash={mockOnHash} />
    );

    const textarea = getByLabelText("Data");
    expect(mockOnHash).toHaveBeenCalledTimes(1); 

    fireEvent.change(textarea, { target: { value: 'New Data' } });

    expect(mockOnHash).toHaveBeenCalledTimes(2); 

    const latestCall = mockOnHash.mock.calls[mockOnHash.mock.calls.length - 1];
    const [calledBlockNumber, newHash] = latestCall;

    expect(calledBlockNumber).toBe(blockNumber);
    expect(newHash).not.toBe(initialHash); 
    expect(newHash).toBe(sha256(blockNumber + 'New Data' + previousHash + initialNonce));
});

