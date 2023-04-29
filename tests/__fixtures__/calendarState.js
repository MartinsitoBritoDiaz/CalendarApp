export const events = [
  {
    id: 1,
    title: "Boss birthday",
    start: new Date('2023-10-21 13:00:00'),
    notes: "Have to buy a cake",
    end: new Date('2023-10-21 16:00:00'),
    bgColor: "#fafaaa",
  },
  {
    id: 2,
    title: "Melissa's birthday",
    start: new Date('2023-11-21 13:00:00'),
    notes: "Have to buy a cake",
    end: new Date('2023-11-21 16:00:00'),
    bgColor: "#fafaaa",
  },
];


export const initialState = {
    events: [],
    activeEvent: null,
    isLoadingEvents: true,
}

export const calendarWithEventsState = {
    events: [ ...events ],
    activeEvent: null,
    isLoadingEvents: false,
}

export const calendarWithActiveEventState = {
    events: [ ...events ],
    activeEvent: { ...events[0] },
    isLoadingEvents: false,
}



