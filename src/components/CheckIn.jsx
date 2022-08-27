import React, { useRef, useEffect, useContext } from "react";
import Subjects from "./Subjects";
import axios from "axios";
import { PersonContext } from "../context";
import { Typography } from "@mui/material";

export const Student = "student";
export const Teacher = "teacher";

function CheckIn() {
  const { person, setPerson } = useContext(PersonContext);

  function toggleSubject(subject) {
    const newSubjects = person.subjects;
    for (const eachSub in newSubjects) {
      if (eachSub === subject) {
        newSubjects[eachSub] = !newSubjects[eachSub];
      }
    }
    setPerson({
      ...person,
      subjects: newSubjects,
    });
  }

  function updateStuOrTea(e) {
    setPerson({
      ...person,
      stuOrTea: e.target.value,
    });
  }

  const inputRef = useRef();
  function handleSubmit() {
    const name = inputRef.current.value;
    if (name === "" || person.stuOrTea === "") {
      return;
    }
    setPerson({
      ...person,
      name: name,
    });
  }

  useEffect(() => {
    if (person.name) {
      const postPerson = async (personData) => {
        const { data: id } = await axios.post("/person", personData);
        setPerson({
          ...person,
          id: +id,
        });
      };
      postPerson(person);
    }
  }, [person.name]);

  return (
    <>
      <div>CheckIn</div>
      <select value={person.stuOrTea} onChange={updateStuOrTea}>
        <option>Select</option>
        <option value={Student}>Student</option>
        <option value={Teacher}>Teacher</option>
      </select>
      <input ref={inputRef} type="text" />
      <Subjects person={person} toggleSubject={toggleSubject} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default CheckIn;
