import React, { useContext } from "react";
import { PersonContext } from "../context";
import Stack from "@mui/material/Stack";

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
      <h1>{person.stuOrTea[0].toUpperCase() + person.stuOrTea.slice(1)}</h1>
      <Stack spacing={2} direction="row">
        <div>No. {person.id}</div>
        <div>Name. {person.name}</div>
        <div>
          Subjects:{" "}
          {subjectArr.map((subject, index) => (
            <span key={index}> {subject} </span>
          ))}
        </div>
      </Stack>
    </>
  );
}

export default PersonDisplay;
