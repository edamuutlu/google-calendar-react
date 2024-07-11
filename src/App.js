import './App.css';
import CalenderHeader from './components/CalenderHeader.js';
import Sidebar from './components/Sidebar.js';
import Month from './components/Month.js';
import { useState, useContext, useEffect } from 'react';
import { getMonth } from './utils';
import GlobalContext from './context/GlobalContext.js'

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {monthIndex} = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex]);

  return (
    <div className="App">
      <div className='h-screen flex flex-col'>
        <CalenderHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
}

export default App;
