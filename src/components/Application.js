// import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay } 
  from '../helpers/selectors';
import useAppData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useAppData();

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
