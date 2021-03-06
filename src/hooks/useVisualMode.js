// Importing
import { useState } from "react";

// Setting the mode/state/prev
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      setMode(mode);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };

  const back = () => {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  };

  return { mode, transition, back };
}
