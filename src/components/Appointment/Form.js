// Importing
import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

// Setting the states for the form
function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.value || null);

  // Function to reset the value of form
  const resetForm = () => {
    setName("");
    setInterviewer(null);
  };

  // Function to cancel the form state
  const cancelForm = () => {
    resetForm();
    props.onCancel();
  };

  // Function to validate if the name value is not empty, if empty, it errors
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };

  // Return for the appointment/form for booking an appointment
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            data-testid="student-name-input"
            name={props.name}
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancelForm()}>
            Cancel
          </Button>
          <Button confirm onClick={(event) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Form;
