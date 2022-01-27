import React from 'react';

import "components/DayListItem.scss";
import classNames from "classnames";

const formalSpots = spots => {
  if (!spots) {
    return 'no spots remaining';
  }

  if (spots === 1) {
    return `${spots} spot remaining`;
  }
  return `${spots} spots remaining`;
}

export default function DayListItem(props) {
  const spotMessage = formalSpots(props.spots)
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
 });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text-regular">{props.name}</h2>
      <h3 className="text-light">{spotMessage}</h3>
    </li>
  );
}