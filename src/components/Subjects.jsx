import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { PersonContext } from "../context";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Subjects() {
  const { person, setPerson } = useContext(PersonContext);

  // get subjects list and add each subject name to subjectsArr
  const [subjectsArr, setSubjects] = useState([]);
  useEffect(() => {
    const getSubjects = async () => {
      const { data: response } = await axios.get("/subjects");
      const result = [];
      for (const subObj of response) {
        result.push(subObj.subject);
      }
      setSubjects(result);
    };
    getSubjects();
  }, []);

  const handleChange = (e) => {
    const subject = e.target.label;
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

  return (
    <Box sx={{ minWidth: 120 }}>
      {subjectsArr.map((subject, index) => (
        <FormControl key={index} style={{minWidth: 100}} >
          <InputLabel id="demo-simple-select-label">{subject}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={person.subjects[subject]}
            label={subject}
            onChange={handleChange}
          >
            {createMenuItems(7)}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}
export default Subjects;
