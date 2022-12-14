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
  const [numTea, setNumTea] = useState(0);
  const [rows, setRows] = useState([]);
  const [stuRows, setStuRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
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

  useEffect(() => {
    createTableCells(dataPerPeriod);
    putRowsIntoArray(rowsPerPeriod);
  }, [dataPerPeriod, teaSub]);

  function pushDataByPeriod(objArr) {
    const copy = JSON.parse(JSON.stringify(dataPerPeriod));
    for (const obj of objArr) {
      copy[String(obj.period)].push(obj);
    }
    setDataPerPeriod(copy);
  }

  function createTableCells(objByPeriod) {
    const newCells = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    for (const period in objByPeriod) {
      // teacher row
      const cellsByRow = [];
      for (const eachData of objByPeriod[period]) {
        if (eachData.isAvailable) {
          cellsByRow.push(
            <TableCell key={eachData.uniqId} align="center">
              {eachData.name}:{" "}
              {teaSub[eachData.name]?.map(
                (subject) => subject.slice(0, 2) + " "
              )}
            </TableCell>
          );
        } else {
          cellsByRow.push(
            <TableCell  key={eachData.uniqId} align="center"></TableCell>
          );
        }
      }
      cellsByRow.unshift(<TableCell rowSpan={4} key={period - 5}>{period}</TableCell>);
      newCells[period].push(cellsByRow);

      // student rows
      for (let i = 0; i < 3; i++) {
        const stuCells = [];
        for (const eachData of objByPeriod[period]) {
          stuCells.push(<TableCell key={eachData.uniqId + i}></TableCell>);
        }
        // stuCells.unshift(<TableCell key={period - 5}>{period}</TableCell>);
        newCells[period].push(stuCells);
      }
    }
    setRowsPerPeriod(newCells);
  }

  function putRowsIntoArray(rowsByPeriod) {
    const allRows = [];
    for (const period in rowsByPeriod) {
      for (const eachRow of rowsByPeriod[period]) {
        allRows.push(eachRow);
      }
    }
    setAllRows(allRows);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {allRows.map((row, index) => (
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
