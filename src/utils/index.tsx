import web3 from 'web3';

export const fromWei = (wei: string) => {
  return web3.utils.fromWei(wei, 'ether');
};

export const toWei = (wei: string) => {
  return web3.utils.toWei(wei, 'ether');
};

