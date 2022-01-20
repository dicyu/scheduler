import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  const resetForm = () => {
    setName('')
    setInterviewer(null)
  }

  const cancelForm = () => {
    resetForm();
    props.onCancel();
  }

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Please enter your name"
        onChange={(event) => setName(event.target.value)}
        value={name}

      />
    </form>
    <InterviewerList
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={(event) => cancelForm()}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  )
}

export default Form;