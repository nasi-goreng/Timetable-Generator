import React, { useState, useContext } from "react";
import axios from "axios";
import { PersonContext } from "../context/personContext";

function Subjects({ person: { subjects }, toggleSubject }) {
  const {value, setValue} = useContext(PersonContext);
  const [subjectsArr, setSubjects] = useState([]);
  const getSubjects = async () => {
    const { data: response } = await axios.get("/subjects");
    setSubjects(response);
  };
  getSubjects();

  function handleSubClick(e) {
    toggleSubject(e.target.value);
  }

  setValue("hey");

  return (
    <div>
      <div>{value}</div>
      {subjectsArr.map((subject, index) => (
        <span key={index}>
          <input
            type="checkbox"
            value={subject.subject}
            checked={subjects[subject.subject]}
            onChange={handleSubClick}
          />
          <span>{subject.subject}</span>
        </span>
      ))}
    </div>
  );
}

export default Subjects;
