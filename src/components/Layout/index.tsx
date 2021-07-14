import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ToastContainer } from 'react-toastify';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from '../../hooks';
import { loadWeb3, loadData } from '../../store/interactions';
import Navbar from '../Navbar';
import Foooter from '../Footer';
import Stake from '../../pages/Stake';
import Unstake from '../../pages/Unstake';

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadWeb3());
    dispatch(loadData());

    (window as any).ethereum.on('chainChanged', async (network: string) => {
      dispatch(loadData());
    });

    (window as any).ethereum.on('accountsChanged', async (accounts: any) => {
      if (accounts.length !== 0) {
        dispatch(loadData());
      }
    });
  }, [dispatch]);
  return (
    <div className="flex flex-col h-screen font-mono">
      <Navbar />
      <main className="flex-grow">
        <Tabs className="text-center mt-8 text-sm">
          <TabList className="shadow-lg p-4 dark:bg-gray-800 dark:text-gray-100">
            <Tab>Stake</Tab>
            <Tab>Withdraw</Tab>
          </TabList>

          <TabPanel className="mt-5">
            <Stake />
          </TabPanel>
          <TabPanel>
            <Unstake />
          </TabPanel>
        </Tabs>
      </main>
      <ToastContainer />
      <Foooter />
    </div>
  );
};

export default Layout;
