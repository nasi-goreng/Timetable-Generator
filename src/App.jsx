import React, { useState, useMemo } from "react";
import "./App.css";
import CheckIn from "./components/CheckIn";
import { PersonContext } from "./context/personContext";

export default function App() {
  const [person, setPerson] = useState({
    id: null,
    stuOrTea: "",
    name: "",
    subjects: {
      Japanese: false,
      Math: false,
      "Social Studies": false,
      Science: false,
      English: false,
    },
  });

  const providerValue = useMemo(() => ({ person, setPerson }), [person, setPerson]);

  return (
    <div className="App">
      <PersonContext.Provider value={providerValue}>
        <CheckIn />
      </PersonContext.Provider>
    </div>
  );
}
