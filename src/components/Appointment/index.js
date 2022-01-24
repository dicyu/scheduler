import React from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from "./Form";
import Status from "./Status";

import useVisualMode from 'hooks/useVisualMode';


import "components/Appointment/styles.scss";
import { action } from "@storybook/addon-actions/dist/preview";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

function Appointment(props) {
  const { id, time, value, interview, interviewers, bookInterview } = props;
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

  return (
    <article className='appointment'>
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={action("onEdit")}
        onDelete={action("onDelete")}
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
    </article>
  );
}

export default Appointment;