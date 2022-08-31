import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../context";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

function Data() {
  const { dates, setDates } = useContext(DatesContext);
  const [data, setData] = useState([]);
  const [teaSub, setTeaSub] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentRows, setStudentRows] = useState([]);
  const [dataPerPeriod, setDataPerPeriod] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [rowsPerPeriod, setRowsPerPeriod] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  // get necessary data when mounting
  useEffect(() => {
    async function fetchAvailableTeachers() {
      try {
        const { data: response } = await axios.get("/available_teachers");
        setData(response);
        pushDataByPeriod(response);
      } catch (err) {
        console.error("Error getting available teachers!", err);
      }
    }
    async function fetchSubsPerTea() {
      const { data: response } = await axios.get("/teachers_subjects");
      const teaToSub = {};
      // make it { name: [ subject, subject, ... ], name: ...}
      for (const obj of response) {
        if (!(obj.name in teaToSub)) {
          teaToSub[obj.name] = [];
        }
        teaToSub[obj.name].push(obj.subject);
      }
      setTeaSub(teaToSub);
    }
    fetchAvailableTeachers();
    fetchSubsPerTea();
  }, []);

  // create rows and cells when the necessary data is ready
  useEffect(() => {
    createTeacherCells(dataPerPeriod[1]);
    createStudentCells(dataPerPeriod);
    putRowsIntoArray(rowsPerPeriod);
  }, [dataPerPeriod, teaSub]);

  function pushDataByPeriod(objArr) {
    const copy = JSON.parse(JSON.stringify(dataPerPeriod));
    for (const obj of objArr) {
      copy[String(obj.period)].push(obj);
    }
    setDataPerPeriod(copy);
  }

  function createTeacherCells(teacherList) {
    const teachersArr = [];
    for (const eachData of teacherList) {
      teachersArr.push(
        <TableCell key={eachData.uniqId} align="center">
          {eachData.name}:{" "}
          {teaSub[eachData.name]?.map((subject) => subject.slice(0, 2) + " ")}
        </TableCell>
      );
    }
    teachersArr.unshift(<TableCell key={uuidv4()}></TableCell>);
    setTeachers(teachersArr);
  }

  function createStudentCells(objByPeriod) {
    const newCells = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    for (const period in objByPeriod) {
      // teacher row
      // const cellsByRow = [];
      // for (const eachData of objByPeriod[period]) {
      //   if (eachData.isAvailable) {
      //     cellsByRow.push(
      //       <TableCell key={eachData.uniqId} align="center">
      //         {eachData.name}:{" "}
      //         {teaSub[eachData.name]?.map(
      //           (subject) => subject.slice(0, 2) + " "
      //         )}
      //       </TableCell>
      //     );
      //   } else {
      //     cellsByRow.push(
      //       <TableCell key={eachData.uniqId} align="center"></TableCell>
      //     );
      //   }
      // }
      // cellsByRow.unshift(
      //   <TableCell rowSpan={4} key={period - 5}>
      //     {period}
      //   </TableCell>
      // );
      // newCells[period].push(cellsByRow);

      // student rows
      for (let i = 0; i < 3; i++) {
        const stuCells = [];
        for (const eachData of objByPeriod[period]) {
          const available = eachData.isAvailable;
          const cellStyles = {
            backgroundColor: !available ? "grey" : "while",
          };
          stuCells.push(
            <TableCell style={cellStyles} key={eachData.uniqId + i}></TableCell>
          );
        }
        if (i === 0) {
          stuCells.unshift(
            <TableCell rowSpan={3} key={period - 5}>
              {period}
            </TableCell>
          );
        }
        newCells[period].push(stuCells);
      }
    }
    setRowsPerPeriod(newCells);
  }

  function putRowsIntoArray(rowsByPeriod) {
    const studentRowsArr = [];
    for (const period in rowsByPeriod) {
      for (const eachRow of rowsByPeriod[period]) {
        studentRowsArr.push(eachRow);
      }
    }
    setStudentRows(studentRowsArr);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          /*sx={{ minWidth: 650 }}*/ size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {dates?.map((date, index) => {
                return (
                  <TableCell
                    colSpan={dataPerPeriod[1].length / 7}
                    key={index}
                    align="center"
                  >
                    {new Date(date).toLocaleDateString()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={uuidv4()}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: 10,
              }}
            >
              {teachers}
            </TableRow>
            {studentRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: 10,
                }}
              >
                {row}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={() => postAvailability(avaiablity)}>Submit</Button> */}
    </>
  );
}

export default Data;
