import React, { useState, } from "react";
import axios from "axios";

function Subjects({ person: { subjects }, toggleSubject }) {
  const [subjectsArr, setSubjects] = useState([]);
  const getSubjects = async () => {
    const { data: response } = await axios.get("/subjects");
    setSubjects(response);
  };
  getSubjects();

  function handleSubClick(e) {
    toggleSubject(e.target.value);
  }

  return (
    <div>
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
