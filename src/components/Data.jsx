import React, { useContext, useEffect, useState } from "react";
import { DatesContext } from "../context";
import axios from "axios";

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
  const [rows, setRows] = useState([]);
  const [stuRows, setStuRows] = useState([]);
  const [dataPerPeriod, setDataPerPeriod] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });

  // get necessary data when mounting
  useEffect(() => {
    async function fetchAvailableTeachers() {
      const { data: response } = await axios.get("/available_teachers");
      setData(response);
      pushDataByPeriod(response);
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

  useEffect(() => {
    createTeaTabelCells(dataPerPeriod);
    // createStuTableCells(dataPerPeriod);
    // console.log(dataPerPeriod);
  }, [dataPerPeriod, teaSub]);

  // useEffect(() => {
  //   console.log(rows);
  // }, [rows]);

  function pushDataByPeriod(objArr) {
    const copy = JSON.parse(JSON.stringify(dataPerPeriod));
    for (const obj of objArr) {
      copy[String(obj.period)].push(obj);
    }
    setDataPerPeriod(copy);
  }

  function createTeaTabelCells(objByPeriod) {
    const rowCellsArr = [];
    for (const period in objByPeriod) {
      const cellsByPeriod = [];
      for (const eachData of objByPeriod[period]) {
        if (eachData.isAvailable) {
          cellsByPeriod.push(
            <TableCell key={eachData.uniqId} align="center">
              {eachData.name}:{" "}
              {teaSub[eachData.name]?.map(
                (subject) => subject.slice(0, 2) + " "
              )}
            </TableCell>
          );
        } else {
          cellsByPeriod.push(
            <TableCell key={eachData.uniqId} align="center"></TableCell>
          );
        }
      }
      cellsByPeriod.unshift(<TableCell key={period - 5}>{period}</TableCell>);
      rowCellsArr.push(cellsByPeriod);
    }
    setRows(rowCellsArr);
  }

  // function createStuTableCells(objByPeriod) {
  //   const tempStuRows = {
  //     1: [],
  //     2: [],
  //     3: [],
  //     4: [],
  //   };
  //   for (const period in objByPeriod) {
  //     const stuCellRows = [];
  //     for (let i = 0; i < 3; i++) {
  //       const stuCells = [];
  //       for (const eachData of objByPeriod) {
  //         stuCells.push(<TableCell key={eachData.uniqId + i}></TableCell>);
  //       }
  //       stuCellRows.push(stuCells);
  //       stuCells.unshift(<TableCell key={period - 5}>{period}</TableCell>);
  //     }
  //     tempStuRows[period] = stuCellRows;
  //   }
  //   setStuRows(tempStuRows);
  // }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {dataPerPeriod[1]?.map((eachData) => {
                return (
                  <TableCell key={eachData.uniqId} align="center">
                    {new Date(eachData.date).toLocaleDateString()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
