import { addHours, differenceInSeconds } from "date-fns";
import { useState, useMemo } from "react";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formSumitted, setFormSumitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log("CLosing modal");
    setIsOpen(false);
  };

  const titleClass = useMemo(() => {
    if( !formSumitted) return '';

    return (formValues.title.length > 0 )
      ? ''
      : 'is-invalid';
  }, [formValues.title, formSumitted ]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSumitted(true);
    
    const difference = differenceInSeconds( formValues.end, formValues.start );
    
    if( isNaN(difference) || difference <= 0 ){
      Swal.fire('Wrong dates','Check on provided dates','error');
      return;
    }

    if( formValues.title.length <= 0 ) return;

    console.log( formValues );
    setIsOpen(false);


    //TODO:
    //Close modal
    //Reset form
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
          <label>Start date</label>
          <DatePicker 
            selected={formValues.start} 
            className="form-control" 
            dateFormat="Pp"
            showTimeSelect
            onChange={ (event) => onDateChange(event, 'start') }
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
            onChange={ (event) => onDateChange(event, 'end') }
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

        <button type="submit" className="btn btn-primary btn-block">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
