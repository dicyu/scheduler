import React from 'react';

import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';

function InterviewerList(props) {

  const interList = props.interviewers.map(interObj => {
    return (
      <InterviewerListItem
      key={interObj.id}
      name={interObj.name}
      avatar={interObj.avatar}
      selected={interObj.id === props.value}
      setInterviewer={() => props.onChange(interObj.id)}
      />
    )
  })
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interList}</ul>
    </section>
  )
}

export default InterviewerList;