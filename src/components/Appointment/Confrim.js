// Importing
import React from "react";
import Button from "../Button";

// Function for the Confrim state
function Confrim(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfrim}>
          Confrim
        </Button>
      </section>
    </main>
  );
}

export default Confrim;