import React, { useRef, useEffect, useContext } from "react";
import Subjects from "./Subjects";
import axios from "axios";
import { PersonContext } from "../context";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Student = "student";
export const Teacher = "teacher";

function CheckIn() {
  const { person, setPerson } = useContext(PersonContext);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl required style={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Student/Teacher</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={person.stuOrTea}
            label="Student/Teacher"
            onChange={updateStuOrTea}
          >
            <MenuItem value={Student}>
              {Student[0].toUpperCase() + Student.slice(1)}
            </MenuItem>
            <MenuItem value={Teacher}>
              {Teacher[0].toUpperCase() + Teacher.slice(1)}
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          ref={inputRef}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          required
        />
      </Box>
      <Subjects />
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default CheckIn;
