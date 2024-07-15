import './App.css';
import CalenderHeader from './components/CalenderHeader.js';
import Sidebar from './components/Sidebar.js';
import Month from './components/Month.js';
import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './utils';
import GlobalContext from './context/GlobalContext.js'
import EventModal from './components/EventModal.js';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex, showEventModal} = useContext(GlobalContext);
  
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal/>} {/* showEventModal doğru ise EventModal'ı gösterir */}
      <div className='h-screen flex flex-col'>
        <CalenderHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
