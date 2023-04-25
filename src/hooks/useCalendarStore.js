import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import { calendarAPI } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const { events, activeEvents } = useSelector(store => store.calendar); 
    const { user } = useSelector(store => store.auth); 

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        // TODO: Arrive to the back end

        //Everything ok
        if( calendarEvent._id) {
            // Updating
            dispatch( onUpdateEvent({...calendarEvent}));
        }else {
            //Creating
            const { data } = await calendarAPI.post('/events', calendarEvent);
            console.log(data)
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
        }
    }

    const startDeletingEvent = async() => {
        //TODO: Arrive to the back end
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents =  async () => {
        try {
            const {data} = await calendarAPI.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch( onLoadEvents( events ) );
        } catch (error) {
            console.log('Error while loading events');
            console.log(error);
        }
    }
 return {
    //Properties
    events,
    activeEvents,
    hasEventSelected: !!activeEvents,

    //Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
 };
};
