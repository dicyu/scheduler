import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const GET_DAYS = '/api/days';
  const GET_APPOINTMENTS = '/api/appointments';
  const GET_INTERVIEWERS = '/api/interviewers';
  
  const setDay = day => setState({...state, day});
      
      useEffect(() => {
        Promise.all([
          Promise.resolve(axios.get(GET_DAYS)),
          Promise.resolve(axios.get(GET_APPOINTMENTS)),
          Promise.resolve(axios.get(GET_INTERVIEWERS))
        ]).then((all) => {
          const [days, appointments, interviewer] = all;
          setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewer.data}));
        });
      }, [])

      function bookInterview(id, interview) {
        console.log(id, interview)
        
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        return axios.put(`/api/appointments/${id}`, appointment)
          .then(res => {
            setState({...state, appointments})
            return res
          })
          .catch((err) => console.log("Error:", err))
      }

      function cancelInterview(id) {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        return axios.delete(`/api/appointments/${id}`, appointment)
          .then((res) => {
            setState({...state, appointments})
            return res
          })
          .catch((err) => console.log("Error:", err))
      }

      // Render appointments and interviewers
      const dailyAppointments = getAppointmentsForDay(state, state.day);
      const interviewers = getInterviewersForDay(state, state.day);

      // Map function to get the schedule of the appointments
      const appSchedule = dailyAppointments.map((scheduleObj) => {
        const interview = getInterview(state, scheduleObj.interview);
        
        return (
          <Appointment 
          {...scheduleObj}
          key={scheduleObj.id}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
        );
      });

  return (
  <main className="layout">
    <section className="sidebar">
      <img
        className ='sidebar--centered'
        src='images/logo.png'
        alt='Interview Scheduler'
      />
      <hr className='sidebar__separator sidebar--centered' />
      <nav className='sidebar__menu'>
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">
      {appSchedule}
      <Appointment key="last" time="5pm" />
    </section>
    </main>
  );
}
