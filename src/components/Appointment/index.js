// Importing
import React, { useEffect } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confrim from "./Confrim";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

// Variables for various states
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFRIM = "CONFRIM";
const DELETING = "DELETING";
const EDIT = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

// Function to handle the appointments
function Appointment(props) {
  const {
    id,
    time,
    value,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
  } = props;

  // Using visualMode to handle, the mode, and transitions
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // Using effect hook
  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, interview]);

  // Function to save an appointment and transition
  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // Function to delete an appointment and transition
  function deleteInterview() {
    if (mode === CONFRIM) {
      transition(DELETING, true);
      cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFRIM);
    }
  }

  // Function for edit transition
  function edit() {
    transition(EDIT);
  }

  // Return element
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={edit}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={value}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFRIM && (
        <Confrim
          message="Are you sure you would like to delete this?"
          onCancel={back}
          onConfrim={deleteInterview}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          name={interview.student}
          value={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not create your appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel your appointment" onClose={back} />
      )}
    </article>
  );
}

export default Appointment;
