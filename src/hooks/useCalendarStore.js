import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const { events, activeEvents } = useSelector(store => store.calendar); 

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
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = async() => {
        //TODO: Arrive to the back end
        dispatch( onDeleteEvent() );
    }
 return {
    //Properties
    events,
    activeEvents,
    hasEventSelected: !!activeEvents,

    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
 };
};
