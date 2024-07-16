import React, { useEffect, useMemo, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

// savedEventsReducer, context içinde kaydedilen olayların nasıl yönetileceğini belirler
function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map(evt => evt.id === payload.id ? payload : evt);
        case "delete":
            return state.filter(evt => evt.id !== payload.id);
        default:
            throw new Error();
    }
}

function initEvents() {
    // Başlangıç durumunu hesaplayan fonksiyon
    const storageEvents = localStorage.getItem("savedEvents");
    let parsedEvents = [];
    try {
        parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    } catch (e) {
        console.error("Failed to parse savedEvents from localStorage", e);
        parsedEvents = [];
    }
    return parsedEvents;
}


export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
        savedEventsReducer,
        [],
        initEvents /* Başlangıç durumunu hesaplayan fonksiyon */
    );

    // SideBar kısmındaki checkbox ile içerik kontrolü
    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
          labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        );
      }, [savedEvents, labels]);

    // savedEvents değiştiğinde, localStorage güncellenir
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    // savedEvents değiştiğinde, labels durumu güncellenir
    useEffect(() => {
        setLabels((prevLabels) => {
          return [...new Set(savedEvents.map((evt) => evt.label))].map(
            (label) => {
              const currentLabel = prevLabels.find(
                (lbl) => lbl.label === label
              );
              return {
                label,
                checked: currentLabel ? currentLabel.checked : true,
              };
            }
          );
        });
      }, [savedEvents]);

    // smallCalenderMonth değiştiğinde, monthIndex güncellenir
    useEffect(() => {
        if (smallCalenderMonth !== null) {
            setMonthIndex(smallCalenderMonth);
        }
    }, [smallCalenderMonth]);

    // Event modalı kapatılınca label da kaldırılır
    useEffect(() => {
        if (!showEventModal) {
          setSelectedEvent(null);
        }
      }, [showEventModal]);

    // 
    function updateLabel(label){
        setLabels(labels.map((lbl) => lbl.label ===label.label ? label : lbl))
    }

    return (
        // GlobalContext.Provider ile değerler sağlanır
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalenderMonth,
            setSmallCalenderMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            setLabels,
            labels,
            updateLabel,
            filteredEvents
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
