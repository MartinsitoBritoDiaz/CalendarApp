import { useCalendarStore, useUIStore } from "../../hooks";

export function FabDelete() {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };
  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-delete btn--custom__red"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <i className=" fas fa-trash-can"></i>
    </button>
  );
}
