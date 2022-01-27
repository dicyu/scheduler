// Importing
import React from "react";
import DayListItem from "components/DayListItem";

// Function displaying Day List
export default function DayList(props) {
  const daySchedule = props.days.map((days) => {
    return (
      <DayListItem
        key={days.id}
        name={days.name}
        spots={days.spots}
        selected={days.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  return <ul>{daySchedule}</ul>;
}
