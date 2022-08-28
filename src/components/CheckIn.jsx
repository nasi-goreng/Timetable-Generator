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


  function updateStuOrTea(e) {
    setPerson({
      ...person,
      stuOrTea: e.target.value,
    });
  }

  function handleSubmit() {
    if (person.name === "" || person.stuOrTea === "") {
      return;
    }
      const postPerson = async (personData) => {
        const { data: id } = await axios.post("/person", personData);
        setPerson({
          ...person,
          id: +id,
        });
      };
      postPerson(person);
  }

  function handleChangeText(e) {
    setPerson({
      ...person,
      name: e.target.value,
    });
  }


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
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={person.name}
          required
          onChange={handleChangeText}
        />
      </Box>
      <Subjects />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default CheckIn;
