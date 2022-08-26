import React, { useState, useRef, useEffect, useContext } from "react";
import Subjects from "./Subjects";
import axios from "axios";
import { PersonContext } from "../context/personContext";

function CheckIn() {
  const { value, setValue } = useContext(PersonContext);
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
    console.log(name);
    setPerson({
      ...person,
      name: name,
    });
  }

  // const isMounted = useRef(false);
  useEffect(() => {
    if (person.name) {
      const postPerson = async (personData) => {
        console.log(personData);
        const { data: id } = await axios.post("/person", personData);
        console.log(id);
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
      <div>{value}</div>
      <div>CheckIn</div>
      <select value={person.stuOrTea} onChange={updateStuOrTea}>
        <option>Select</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <input ref={inputRef} type="text" />
      <Subjects person={person} toggleSubject={toggleSubject} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default CheckIn;
