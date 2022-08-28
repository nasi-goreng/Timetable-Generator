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
    createTabelCells(dataPerPeriod);
    // console.log(dataPerPeriod);
  }, [dataPerPeriod]);

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

  function createTabelCells(objByPeriod) {
    const rowCellsArr = [];
    for (const period in objByPeriod) {
      const cellsByPeriod = [];
      console.log(cellsByPeriod);
      for (const eachData of objByPeriod[period]) {
        if (eachData.isAvailable) {
          cellsByPeriod.push(
            <TableCell key={eachData.uniqId} align="center">
              {eachData.name}:{" "}
              {teaSub[eachData.name]?.map((subject) => subject + " ")}
            </TableCell>
          );
        } else {
          cellsByPeriod.push(
            <TableCell key={eachData.uniqId} align="center"></TableCell>
          );
        }
      }
      cellsByPeriod.unshift(<TableCell>{period}</TableCell>);
      rowCellsArr.push(cellsByPeriod);
    }
    // console.log(rowCellsArr);
    setRows(rowCellsArr);
  }

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
