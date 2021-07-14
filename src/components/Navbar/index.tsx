import React from 'react';

import logo from '../../assets/imgs/logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { enableMetamask } from '../../store/interactions';
import useDarkMode from '../../hooks/useDarkMode';
const Navbar = () => {
  const [colorTheme, setTheme] = useDarkMode();

  const { interaction } = useAppSelector((state: any) => state);

  const dispatch = useAppDispatch();

  return (
    <>
      <header className="bg-blue-300 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="block h-52  w-auto" src={logo} alt="Workflow" />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {interaction.data !== null ? (
                <p className="truncate w-40 text-gray-600 text-sm dark:text-gray-300">
                  <span className="bg-gradient-to-l from-gray-400 to-gray-300 text-gray-700 p-3 rounded-md">
                    {interaction.data.network === 4
                      ? 'Rinkeby'
                      : interaction.data.network === '0x2a'
                      ? 'Kovan'
                      : interaction.data.network === '0x3'
                      ? 'Ropsten'
                      : interaction.data.network === '0x5'
                      ? 'Goerli'
                      : null}
                  </span>{' '}
                  {interaction.data.address}
                </p>
              ) : (
                <button
                  className="bg-gray-100 dark:bg-gray-50 dark:text-gray-800  py-1 px-3 text-sm rounded-md text-gray-600 hover:text-gray-800 dark:hover:text-black focus:outline-none"
                  onClick={() => dispatch(enableMetamask())}
                >
                  Connect to a Wallet
                </button>
              )}

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <button onClick={() => setTheme(colorTheme)} className="block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-600 dark:text-gray-200"
                  >
                    {colorTheme === 'light' ? (
                      <path
                        className="w-3 h-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    ) : (
                      <path
                        className="w-3 h-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
