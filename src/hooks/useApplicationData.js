// Importing
import { useEffect, useReducer } from "react";
import axios from "axios";

// Function to use app data
export default function useAppData() {
  // Variables for setting info and API routes
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

  const GET_DAYS = "/api/days";
  const GET_APPOINTMENTS = "/api/appointments";
  const GET_INTERVIEWERS = "/api/interviewers";

  // Function to update remaining spots when adding or deleting a interview
  function getSpotsForDay(state, day) {
    return state.days
      .find((apptDays) => apptDays.name === day)
      .appointments.reduce((x, y) => {
        return state.appointments[y].interview ? x : x + 1;
      }, 0);
  }

  // Reducer, fills data from server database
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case SET_INTERVIEW_DAYS: {
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
        };
      }
      case SET_INTERVIEW: {
        const newState = {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview,
            },
          },
        };
        return {
          ...newState,
          days: state.days.map((day) => ({
            ...day,
            spots: getSpotsForDay(newState, day.name),
          })),
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

  // Axios to grab the data from API
  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ]).then((all) => {
      const [days, appointments, interviewer] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewer.data,
      });
    });
  }, []);

  // Adding interview to the database
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      });
    });
  }

  // Deleting a interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
