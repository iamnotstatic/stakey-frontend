import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { fromWei } from '../utils';
import Farm from '../abis/farm.json';
import Erc20 from '../abis/erc20.json';

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

const slice = createSlice({
  name: 'interactions',
  initialState: {
    ethers: {},
    signer: {},
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

    // Get  DAI Balance
    const initDaiBalance = await dai.balanceOf(address);
    const daiBalance = fromWei(initDaiBalance, 18);

    // Get Stakey Balance
    const initStakeyBalance = await stakey.balanceOf(address);
    const stakeyBalance = fromWei(initStakeyBalance, 18);

    // Get Staking Balance
    const initStakingBalance = await farm.stakingBalance(address);
    const stakingBalance = fromWei(initStakingBalance, 18);

    dispatch(
      intData({
        address,
        network,
        farm,
        dai,
        stakey,
        daiBalance,
        stakeyBalance,
        stakingBalance,
      })
    );
  } catch (error) {
    console.log('Metamask not connected', error.message);
  }
};
