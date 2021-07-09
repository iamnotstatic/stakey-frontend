import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import Farm from '../abis/farm.json';
import Erc20 from '../abis/erc20.json';

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

const slice = createSlice({
  name: 'interactions',
  initialState: {
    ethers: {},
    signer: {},
    farm: null,
    dai: null,
    stakey: null,
    data: null,
  },
  reducers: {
    initEthers: (state, action) => {
      state.ethers = action.payload.provider;
      state.signer = action.payload.signer;
    },
    initMetamask: (state) => {
      console.log(state);
    },
    initContracts: (state, action: any) => {
      state.farm = action.farm;
      state.dai = action.dai;
      state.stakey = action.stakey;
    },

    intData: (state: any, action) => {
      state.data = action.payload;
    },
  },
});
export default slice.reducer;

export const { initEthers, initMetamask, intData } = slice.actions;

export const loadEthers = () => async (dispatch: any) => {
  dispatch(initEthers({ provider, signer: provider.getSigner() }));
};
export const enableMetamask = () => async (dispatch: any) => {
  try {
    if ((window as any).ethereum) {
      await (window as any).ethereum.enable();
    }
    dispatch(initMetamask());
  } catch (e) {
    return console.log(e.message);
  }
};

export const loadData = (network?: string) => async (dispatch: any) => {
  const farm = new ethers.Contract(
    process.env.REACT_APP_FARM_CONTRACT_ADDRESS as string,
    Farm,
    provider
  );
  const dai = new ethers.Contract(
    process.env.REACT_APP_DAI_CONTRACT_ADDRESS as string,
    Erc20,
    provider
  );

  const stakey = new ethers.Contract(
    process.env.REACT_APP_STAKEY_CONTRACT_ADDRESS as string,
    Erc20,
    provider
  );
  const signer = provider.getSigner();

  try {
    const address = await signer.getAddress();
    dispatch(intData({ address, network, farm, dai, stakey }));
  } catch (error) {
    console.log('Metamask not connected');
  }
};
