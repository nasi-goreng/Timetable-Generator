import React, { useContext } from "react";
import { PersonContext } from "../context/personContext";

function PersonDisplay() {
  const { person, setPerson } = useContext(PersonContext);

  const subjectArr = [];
  for (const subjectName in person.subjects) {
    if (person.subjects[subjectName]) {
      subjectArr.push(subjectName);
    }
  }

  return (
    <>
      <h1>{person.stuOrTea}</h1>
      <div>No. {person.id}</div>
      <div>Name. {person.name}</div>
      <div>
        Subjects:
        <span>
          {subjectArr.map((subject, index) => (
            <div key={index}>{subject}</div>
          ))}
        </span>
      </div>
    </>
  );
}

export default PersonDisplay;
