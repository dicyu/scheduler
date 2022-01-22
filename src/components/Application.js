import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import getAppointmentsForDay from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  
  const GET_DAYS = 'http://localhost:8001/api/days';
  const GET_APPOINTMENTS = 'http://localhost:8001/api/appointments';
  const GET_INTERVIEWERS = 'http://localhost:8001/api/interviewers';
  
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
            
      const dailyAppointments = getAppointmentsForDay(state, state.day);
      const appSchedule = dailyAppointments.map((scheduleObj) => {
        return (
          <Appointment key={scheduleObj.id} {...scheduleObj} />
          )
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
