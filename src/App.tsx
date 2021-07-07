import React from 'react';
import useDarkMode from './hooks/useDarkMode';
import Navbar from './components/Navbar';

const App = () => {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className="w-full dark:bg-gray-800">
      <Navbar />
      
    </div>
  );
};

export default App;
