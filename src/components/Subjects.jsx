import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PersonContext } from "../context";
import { Student, Teacher } from "./CheckIn";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Subjects() {
  const { person, setPerson } = useContext(PersonContext);
  const [subjectsArr, setSubjects] = useState([]);
  const subjectChecked = {};
  const [checked, setChecked] = useState({});
  // get subjects list and add each subject name to subjectsArr
  useEffect(() => {
    const getSubjects = async () => {
      const { data: response } = await axios.get("/subjects");

      const result = [];
      for (const subObj of response) {
        result.push(subObj.subject);
      }
      setSubjects(result);

      // create an object to have each subject check box set to false
      for (const subject of result) {
        subjectChecked[subject] = false;
      }
      setChecked(subjectChecked);
    };
    getSubjects();
  }, []);

  ////////////////////////////////// to see if person is updated
  // useEffect(() => {
  //   console.log(person);
  // }, [person]);

  const handleChange = (e) => {
    const subject = e.target.name;
    const num = e.target.value;
    const copyOfSubjects = person.subjects;
    setPerson({
      ...person,
      subjects: {
        ...copyOfSubjects,
        [subject]: num,
      },
    });
  };

  // change checked in checkbox and update person.subjects with 0 or 1, when clicked
  const handleClick = (e) => {
    const currentChecked = checked[e.target.value];
    setChecked({
      ...checked,
      [e.target.value]: !currentChecked,
    });
    const copyOfSubjects = person.subjects;
    setPerson({
      ...person,
      subjects: {
        ...copyOfSubjects,
        [e.target.value]: +!currentChecked,
      },
    });
    // console.log(e.target.value);
    // console.log(+!currentChecked);
  };

  function createMenuItems(n) {
    const output = [];
    for (let i = 0; i < n; i++) {
      output.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return output;
  }

  if (person.stuOrTea === Student) {
    return (
      <Box sx={{ minWidth: 120 }}>
        {subjectsArr.map((subject, index) => (
          <FormControl key={index} style={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-label">{subject}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={person.subjects[subject]}
              label={subject}
              name={subject}
              onChange={handleChange}
            >
              {createMenuItems(7)}
            </Select>
          </FormControl>
        ))}
      </Box>
    );
  } else if (person.stuOrTea === Teacher) {
    return (
      <FormGroup>
        {subjectsArr.map((subject, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                onClick={handleClick}
                checked={checked[subject]}
                value={subject}
              />
            }
            label={subject}
          />
        ))}
      </FormGroup>
    );
  }
}
export default Subjects;
