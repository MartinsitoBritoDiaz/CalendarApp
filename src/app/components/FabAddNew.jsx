import React from "react";
import { useCalendarStore, useUIStore } from "../../hooks";
import { addHours } from "date-fns";

export function FabAddNew() {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const handleCLickNew = () => {
    setActiveEvent({
      title: "",
      start: new Date(),
      notes: "",
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Luisin",
      },
    });
    openDateModal();
  };
  return (
    <button className="btn btn-secondary fab btn--custom" onClick={handleCLickNew}>
      <i className="fas fa-duotone fa-plus"></i>
    </button>
  );
}
