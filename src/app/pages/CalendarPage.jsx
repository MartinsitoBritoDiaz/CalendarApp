import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import { useEffect, useState } from 'react';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from '../';
import { localizer, getMessages } from '../../helpers';
import { useCalendarStore, useUIStore } from '../../hooks';
import { FabDelete } from '../components/FabDelete';

export function CalendarPage () {
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week');
  
  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    setActiveEvent( event );
  }

  const onViewChange = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <div className='bg-white'>
      <Navbar />

      <div className='calendar-bg'>
        <Calendar
          localizer={localizer} 
          events={events}
          defaultView={lastView}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 'calc( 100vh - 75px)' }}
          // messages={ getMessages() }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChange }
        />
        <CalendarModal />
        <FabAddNew />
        <FabDelete />

      </div>
    </div>
  );
};
