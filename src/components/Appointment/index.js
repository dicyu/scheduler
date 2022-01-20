import React from "react";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';


import "components/Appointment/styles.scss";
import { action } from "@storybook/addon-actions/dist/preview";

function Appointment(props) {
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {props.interview ? <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={action("onEdit")}
        onDelete={action("onDelete")}
        /> : <Empty />}
    </article>
  );
}

export default Appointment;