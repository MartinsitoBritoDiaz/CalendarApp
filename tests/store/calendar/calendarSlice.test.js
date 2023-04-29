import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../__fixtures__/calendarState";

describe("Testing inside calendarSlice", () => {
  test("should load the initial state", () => {
    const state = calendarSlice.getInitialState();
    // console.log(state)
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent should activate the event", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    // console.log(state)

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent should add the event", () => {
    const newEvent = {
      id: 3,
      title: "Fernando's birthday",
      start: new Date("2023-12-21 13:00:00"),
      notes: "Have to buy a cake",
      end: new Date("2023-12-21 16:00:00"),
      bgColor: "#fafaaa",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    // console.log(state)

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent should update the event", () => {
    const updatedEvent = {
      id: 1,
      title: "Boss birthday",
      start: new Date("2023-10-21 13:00:00"),
      notes: "Have to buy two cakes",
      end: new Date("2023-10-21 16:00:00"),
      bgColor: "#fafaaa",
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    // console.log(state)

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent should delete one event", () => {
    const DeleteState = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(DeleteState.events).not.toContain(
      calendarWithActiveEventState.activeEvent
    );
  });

  test("onLoadEvents should load events", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);
  });

  test("onLogoutEvents should clean the state", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );

    expect(state).toEqual(initialState);
  });
});
