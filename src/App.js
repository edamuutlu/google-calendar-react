import React, { useState } from 'react';
import './App.css';
import CalenderHeader from './components/CalenderHeader';
import Month from './components/Month';
import Sidebar from './components/Sidebar';
import { getMonth } from './util';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <React.Fragment>
      <div className='h-screen flex flex-columns'>
        <CalenderHeader/>
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
