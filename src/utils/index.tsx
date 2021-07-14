import web3 from 'web3';

import { toast } from 'react-toastify';

import check from '../assets/imgs/check.svg';

export const fromWei = (wei: string) => {
  return web3.utils.fromWei(wei, 'ether');
};

export const toWei = (wei: string) => {
  return web3.utils.toWei(wei, 'ether');
};

export const showAlert = (title: string, hash: string) => {
  toast?.dark(
    <div className="flex">
      <div className="">
        <img src={check} alt="check" className="w-7 mt-2" />
      </div>
      <div className="">
        <span className="ml-4 font-bold">{title}</span>
        <br />
        <a
          className="ml-4 text-blue-600 text-sm hover:text-blue-500"
          href={`${process.env.REACT_APP_EXPLORER_URL}tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          View on Explorer
        </a>
      </div>
      <br />
    </div>
  );
};
