import React from 'react';

const Stake = () => {
  return (
    <div className="bg-gray-100 mx-auto max-w-lg shadow-lg rounded overflow-hidden p-4 sm:flex dark:bg-gray-800 mt-20">
      <form className="w-full p-5">
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="amount"
            ></label>
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-50"
              htmlFor="amount"
            >
              Balance: 38.7 Dai <span className="text-blue-300 cursor-pointer">(Max)</span>
            </label>
          </div>

          <input
            className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="0"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-400 py-4 px-6 rounded-lg text-gray-50">Approve</button>
          <button className="bg-blue-300 py-4 px-8 rounded-lg text-gray-50">Stake</button>
        </div>
      </form>
    </div>
  );
};

export default Stake;
