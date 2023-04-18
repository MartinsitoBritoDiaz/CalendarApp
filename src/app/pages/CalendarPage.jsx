import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { addHours, format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

import { Navbar } from "../components/Navbar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Boss birtday",
    start: new Date(),
    notes: "Have to buy a cake",
    end: addHours(new Date(), 2),
    bgColor: "#fafaaa",
    user: {
      _id: "123",
      name: "Luisin",
    },
  },
];

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <div className="calendar-bg">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px)' }}
        />
      </div>
    </>
  );
};
