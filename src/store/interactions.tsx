import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import Farm from '../abis/farm.json';
import erc20 from '../abis/erc20.json';

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

const slice = createSlice({
  name: 'interactions',
  initialState: {
    ethers: {},
  },
  reducers: {
    loadEthers: (state) => {
      state.ethers = provider;
      console.log(provider.getSigner());
    },
  },
});
export default slice.reducer;

export const { loadEthers } = slice.actions;
