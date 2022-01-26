import React, { useEffect } from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import Confrim from "./Confrim";
import Error from "./Error";

import useVisualMode from 'hooks/useVisualMode';


import "components/Appointment/styles.scss";
// import { action } from "@storybook/addon-actions/dist/preview";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFRIM = 'CONFRIM';
const DELETING = 'DELETING';
const EDIT = 'EDITING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

function Appointment(props) {
  const { 
    id, 
    time, 
    value, 
    interview, 
    interviewers, 
    bookInterview, 
    cancelInterview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY 
  );

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [mode, transition, interview])

  function save(name, interviewer) {
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    if(mode === CONFRIM) {
      transition(DELETING, true)
      cancelInterview(id)
        .then(() => transition(EMPTY))
        .catch(() => transition(ERROR_DELETE, true));
    } else {
      transition(CONFRIM);
    }
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
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
        {mode === SAVING && (
        <Status 
        message="Saving" 
        />
        )}
        {mode === CONFRIM && 
        <Confrim 
          message="Are you sure you would like to delete this?"
          onCancel={back}
          onConfrim={deleteInterview}
        />}
        {mode === DELETING &&
        <Status 
          message="Deleting" 
        />
        }
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
        <Error
          message="Could not create your appointment"
          onClose={back}
        />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Could not cancel your appointment"
            onClose={back}
          />
        )}
    </article>
  );
}

export default Appointment;