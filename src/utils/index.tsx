import { ethers } from 'ethers';

export const fromWei = (wei: string, decimals: number) => {
  return ethers.utils.formatUnits(wei, decimals);
};

export const toWei = (wei: string, decimals: number) => {
  return ethers.utils.parseUnits(wei, decimals);
};

