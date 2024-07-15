import React,{ useEffect, useState }  from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);

    useEffect(() => {
        if(smallCalenderMonth !== null){
            setMonthIndex(smallCalenderMonth);
        }
    }, [smallCalenderMonth])

  return (
     <GlobalContext.Provider value={{
        monthIndex, 
        setMonthIndex, 
        smallCalenderMonth, 
        setSmallCalenderMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal
        }}>
        {props.children}
     </GlobalContext.Provider>   
  )
}
