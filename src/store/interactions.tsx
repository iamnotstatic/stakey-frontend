import { createSlice } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { fromWei } from '../utils';
import Farm from '../abis/farm.json';
import Erc20 from '../abis/erc20.json';

const provider = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const slice = createSlice({
  name: 'interactions',
  initialState: {
    web3: {},
    data: null,
  },
  reducers: {
    initWeb3: (state, action) => {
      state.web3 = action.payload.provider;
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

export const { initWeb3, initMetamask, intData } = slice.actions;

export const loadWeb3 = () => async (dispatch: any) => {
  dispatch(initWeb3({ provider }));
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

export const loadData = () => async (dispatch: any) => {
  const farm = new provider.eth.Contract(
    Farm as any,
    process.env.REACT_APP_FARM_CONTRACT_ADDRESS as string
  );
  const dai = new provider.eth.Contract(
    Erc20 as any,
    process.env.REACT_APP_DAI_CONTRACT_ADDRESS as string
  );

  const stakey = new provider.eth.Contract(
    Erc20 as any,
    process.env.REACT_APP_STAKEY_CONTRACT_ADDRESS as string
  );

  try {
    const address = await provider.eth.getAccounts();
    const network = await provider.eth.net.getId();

    // Get  DAI Balance
    const initDaiBalance = await dai.methods.balanceOf(address[0]).call();
    const daiBalance = fromWei(initDaiBalance);

    // Get Stakey Balance
    const initStakeyBalance = await stakey.methods.balanceOf(address[0]).call();
    const stakeyBalance = fromWei(initStakeyBalance);

    // Get Staking Balance
    const initStakingBalance = await farm.methods
      .stakingBalance(address[0])
      .call();

    const stakingBalance = fromWei(initStakingBalance);

    dispatch(
      intData({
        address: address[0],
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
