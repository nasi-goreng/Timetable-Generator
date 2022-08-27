import React, { useState, useMemo } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
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

  const providerValue = useMemo(
    () => ({ person, setPerson }),
    [person, setPerson]
  );

  return (
    <div className="App">
      <h1>Scheduler</h1>
      <PersonContext.Provider value={providerValue}>
        <Tabs />
      </PersonContext.Provider>
    </div>
  );
}
