import React, { useState, useMemo } from "react";
import "./App.css";
import CheckIn from "./components/CheckIn";
import { PersonContext } from "./context/personContext";

export default function App() {
  const [value, setValue] = useState("hello from context");

  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <div className="App">
      <PersonContext.Provider value={providerValue}>
        <CheckIn />
      </PersonContext.Provider>
    </div>
  );
}
