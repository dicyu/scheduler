// Importing
import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// Rendering the interviewers
function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    interviewers__item: !props.selected,
  });

  const interviewImage = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
    "interviewers__item-image": !props.selected,
  });

  return (
    <li 
      onClick={props.setInterviewer} 
      className={interviewClass}>
        <img className={interviewImage} src={props.avatar} alt={props.name} />
        {props.selected && props.name}
    </li>
  );
}

export default InterviewerListItem;
