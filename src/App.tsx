import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="font-mono">
      <Navbar />
      <Tabs className="text-center mt-10 text-sm">
        <TabList>
          <Tab>Stake</Tab>
          <Tab>Withdraw</Tab>
        </TabList>

        <TabPanel className="mt-5">
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;
