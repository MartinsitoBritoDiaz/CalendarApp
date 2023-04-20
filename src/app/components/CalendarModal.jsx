import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useUIStore } from "../../hooks";
import { customStyles } from "../../helper";
import { useCustomForm } from "../../hooks";


Modal.setAppElement("#root");

export function CalendarModal() {

  const {titleClass, formValues, onSubmit, updateFormValues, isDateModalOpen, closeDateModal } = useCustomForm();

  const onInputChange = ({ target }) => {
    updateFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    updateFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="d-flex justify-content-between">
        <h1 className="fs-3 my-3"> New Event </h1>
        <button className="btn btn-lg btn--closeModal" onClick={onCloseModal}>
          <i className="fas fa-xmark"></i>
        </button>
      </div>

      <form className="container " onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Start date</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            onChange={(event) => onDateChange(event, "start")}
          />
        </div>

        <div className="form-group mb-2">
          <label>End date</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            onChange={(event) => onDateChange(event, "end")}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Birthday"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-light">
            Short description
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Aditional information
          </small>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn--custom btn-block align-left">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
