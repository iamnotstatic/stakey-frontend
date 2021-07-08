import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Navbar from '../Navbar';
import Stake from '../../pages/Stake';
import Unstake from '../../pages/Unstake';

const Layout = () => {
  return (
    <div className="font-mono">
      <Navbar />
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
    </div>
  );
};

export default Layout;
