import React from 'react';

import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';

function InterviewerList(props) {

  const interList = props.interviewers.map(interview => {
    return (
      <InterviewerListItem
      key={interview.id}
      name={interview.name}
      avatar={interview.avatar}
      selected={interview.id === props.value}
      setInterviewer={() => props.onChange(interview.id)}
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