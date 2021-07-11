import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { toWei, fromWei } from '../../utils';
import { loadData } from '../../store/interactions';
import { useAppSelector, useAppDispatch } from '../../hooks';

import check from '../../assets/imgs/check.svg';

const Stake = () => {
  const [amount, setAmount] = useState('0.0');
  const [stakeStatus, setStakeStatus] = useState(true);
  const [approveStatus, setApproveStatus] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);

  const { interaction } = useAppSelector((state: any) => state);

  const dispatch = useAppDispatch();

  const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const expectedBlockTime = 10000;

  const onStake = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStakeLoading(true);
      await interaction.data.farm.methods
        .deposit(toWei(amount))
        .send({ from: interaction.data.address })
        .on('transactionHash', async (hash: string) => {
          let transactionReceipt = null;
          while (transactionReceipt == null) {
            transactionReceipt =
              await interaction.web3.eth.getTransactionReceipt(hash);
            await sleep(expectedBlockTime);
          }

          setApproveLoading(false);
          setApproveStatus(false);
          setStakeStatus(true);
          setStakeLoading(false);
          setAmount('0.0');
          dispatch(loadData());

          toast.dark(
            <div className="flex">
              <div className="">
                <img src={check} alt="check" className="w-7 mt-2" />
              </div>
              <div className="">
                <span className="ml-4 font-bold">Staked {amount} DAI</span>
                <br />
                <a
                  className="ml-4 text-blue-600 text-sm hover:text-blue-500"
                  href={`${process.env.REACT_APP_EXPLORER_URL}${hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Explorer
                </a>
              </div>
              <br />
            </div>
          );
        });
    } catch (error) {
      setStakeStatus(true);
      setStakeLoading(false);
      setApproveStatus(false);
    }
  };

  const onApprove = async (e: React.FormEvent) => {
    e.preventDefault();

    const balance = await interaction.data.dai.methods
      .allowance(
        interaction.data.address,
        process.env.REACT_APP_FARM_CONTRACT_ADDRESS
      )
      .call();

    try {
      if (parseFloat(fromWei(balance)) >= parseFloat(amount)) {
        setApproveLoading(false);
        setApproveStatus(true);
        setStakeStatus(false);
      } else {
        setApproveLoading(true);

        await interaction.data.dai.methods
          .approve(process.env.REACT_APP_FARM_CONTRACT_ADDRESS, toWei(amount))
          .send({ from: interaction.data.address })
          .on('transactionHash', async (hash: string) => {
            let transactionReceipt = null;
            while (transactionReceipt == null) {
              transactionReceipt =
                await interaction.web3.eth.getTransactionReceipt(hash);
              await sleep(expectedBlockTime);
            }

            setApproveLoading(false);
            setApproveStatus(true);
            setStakeStatus(false);

            toast.dark(
              <div className="flex">
                <div className="">
                  <img src={check} alt="check" className="w-7 mt-2" />
                </div>
                <div className="">
                  <span className="ml-4 font-bold">Approve DAI</span>
                  <br />
                  <a
                    className="ml-4 text-blue-600 text-sm hover:text-blue-500"
                    href={`${process.env.REACT_APP_EXPLORER_URL}${hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Explorer
                  </a>
                </div>
                <br />
              </div>
            );
          });
      }
    } catch (error) {
      setApproveLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 mx-auto max-w-lg shadow-lg dark:shadow-2xl rounded overflow-hidden p-4 sm:flex dark:bg-gray-800 mt-20">
      <form className="w-full p-5">
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-50"
              htmlFor="amount"
            >
              {interaction.data && interaction.data.stakeyBalance} Stakey
            </label>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-50"
              htmlFor="amount"
            >
              {interaction.data && interaction.data.daiBalance} Dai
              <span
                className="text-blue-300 cursor-pointer"
                onClick={() => setAmount(interaction.data.daiBalance)}
              >
                (Max)
              </span>
            </label>
          </div>

          <input
            className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            name="amount"
            type="number"
            value={amount}
            placeholder="0.0"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            className={`bg-gray-400 py-4 px-6 rounded-lg text-gray-50 ${
              approveStatus || approveLoading === true
                ? 'disabled:opacity-50 cursor-not-allowed'
                : null
            }`}
            onClick={onApprove}
            disabled={approveStatus}
          >
            {approveLoading === true ? 'Approving...' : 'Approve'}
          </button>
          <button
            className={`bg-blue-300 py-4 px-8 rounded-lg text-gray-50 ${
              stakeStatus || stakeLoading === true
                ? 'disabled:opacity-50 cursor-not-allowed'
                : null
            }`}
            onClick={onStake}
            disabled={stakeStatus}
          >
            {stakeLoading === true ? 'Staking...' : 'Stake'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Stake;
