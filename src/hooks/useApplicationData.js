import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAppData() {

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

    // Function to find the day from state.day
    function dayFinder(day) {
      const theDays = {
        Monday: 0,
        Tuesday: 1,
        Wednesday: 2,
        Thursday: 3,
        Friday: 4
      }
      return theDays[day]
    }

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

      
      const theDay = dayFinder(state.day)
      console.log("Info")
      console.log(theDay)

      let day = {
        ...state.days[theDay],
        spot: state.days[theDay]
      }
      
      if (!state.appointments[id].interview) {
        day = {
          ...state.days[theDay],
          spots: state.days[theDay].spots - 1
        }
      } else {
        day = {
          ...state.days[theDay],
          spots: state.days[theDay].spots
        }
      }


      let days = state.days
      days[theDay] = day;

      return axios.put(`/api/appointments/${id}`, appointment)
        .then(res => {
          setState({...state, appointments, days})
          return res
        })
        // .catch((err) => console.log("Error:", err))
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

      const theDay = dayFinder(state.day)
      const day = {
        ...state.days[theDay],
        spots: state.days[theDay].spots + 1
      }

      let days = state.days
      days[theDay] = day;

      return axios.delete(`/api/appointments/${id}`, appointment)
        .then((res) => {
          setState({...state, appointments, days})
          return res
        })
        // .catch((err) => console.log("Error:", err))
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  }
  