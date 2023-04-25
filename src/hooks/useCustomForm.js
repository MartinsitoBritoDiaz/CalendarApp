import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useCalendarStore } from "./useCalendarStore";
import { useUIStore } from "./useUIStore";

const initialState = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
};

export const useCustomForm = () => {
  const [formValues, updateFormValues] = useState(initialState);
  const [formSumitted, setFormSumitted] = useState(false);
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUIStore();

  const titleClass = useMemo(() => {
    if (!formSumitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSumitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      updateFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSumitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Wrong dates", "Check on provided dates", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    //TODO:
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSumitted(false);
  };

  return {
    titleClass,
    formValues,
    onSubmit,
    updateFormValues,
    isDateModalOpen,
    closeDateModal,
  };
};
