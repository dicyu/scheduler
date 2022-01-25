import React from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";
import Confrim from "./Confrim";

import useVisualMode from 'hooks/useVisualMode';


import "components/Appointment/styles.scss";
import { action } from "@storybook/addon-actions/dist/preview";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFRIM = 'CONFRIM';
const DELETING = 'DELETING';
const EDIT = 'EDITING';

function Appointment(props) {
  const { id, time, value, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY 
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    }
    bookInterview(id, interview)
      .then(() => transition(SHOW))
  }

  function deleteInterview() {
    if(mode === CONFRIM) {
      transition(DELETING)
      cancelInterview(id)
        .then(() => transition(EMPTY))
    } else {
      transition(CONFRIM);
    }
  }

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={action("onEdit")}
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
    </article>
  );
}

export default Appointment;