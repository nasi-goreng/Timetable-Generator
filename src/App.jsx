import React, { useState, useMemo } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import { DatesContext, PersonContext } from "./context";

export default function App() {
  const [person, setPerson] = useState({
    id: null,
    stuOrTea: "",
    name: "",
    subjects: {
      Japanese: 0,
      Math: 0,
      "Social Studies": 0,
      Science: 0,
      English: 0,
    },
  });

  const personProviderValue = useMemo(
    () => ({ person, setPerson }),
    [person, setPerson]
  );

  const [dates, setDates] = useState([]);

  return (
    <div className="App">
      <h1>Timetable Generator</h1>
      <PersonContext.Provider value={personProviderValue}>
        <DatesContext.Provider value={{ dates, setDates }}>
          <Tabs />
        </DatesContext.Provider>
      </PersonContext.Provider>
    </div>
  );
}
