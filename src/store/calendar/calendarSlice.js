import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Boss birthday',
//     start: new Date(),
//     notes: 'Have to buy a cake',
//     end: addHours(new Date(), 2),
//     bgColor: '#fafaaa',
//     user: {
//       _id: '123',
//       name: 'Martin',
//     }
// };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            // tempEvent
        ],
        activeEvents: null,
        isLoadingEvents: true,
    },
    reducers: {
        onSetActiveEvent: (state, action ) => {
            state.activeEvents = action.payload;
        },
        onAddNewEvent: (state, { payload } ) => {
            state.events.push( payload );
            state.activeEvents = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map( event => {
                if( event._id === payload._id){
                    return payload;
                }
                return event;
            });
        },
        onDeleteEvent: (state) => {
            if( state.activeEvents ){
                state.events = state.events.filter( event => event._id !== state.activeEvents._id );
                state.activeEvents = null;
            }
        },
        onLoadEvents: (state, { payload = [] }) =>{
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if( !exists){
                    state.events.push(event);
                }
            });
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;