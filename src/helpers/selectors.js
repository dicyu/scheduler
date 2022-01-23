// Selector Helper
const filteredAppts = (appointments, id) => {
  const filtered = id.map(id => appointments[id]);
  return filtered;
}

export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
    return null;
  })
  return filteredAppts(state.appointments, appointmentArr);
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interInfo = state.interviewers[interview.interviewer]
  return {
    student: interview.student,
    interviewer: interInfo
  }
}