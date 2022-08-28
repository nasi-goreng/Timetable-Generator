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

  // get necessary data
  useEffect(() => {
    async function fetchAvailableTeachers() {
      const { data: response } = await axios.get("/available_teachers");
      setData(response);
    }
    async function fetchSubsPerTea() {
      const { data: response } = await axios.get("/teachers_subjects");
      const teaToSub = {};
      for (const obj of response) {
        if (!(obj.name in teaToSub)) {
          teaToSub[obj.name] = [];
        }
        teaToSub[obj.name].push(obj.subject);
      }
      setTeaSub(teaToSub);
      console.log(teaToSub);
    }
    fetchAvailableTeachers();
    fetchSubsPerTea();
  }, []);

  function createTableRows(dataArr) {
    const output = [];
    let cellsInRow = [];
    for (let i = 1; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        if (j === 0) {
          cellsInRow.push(<TableCell></TableCell>);
          for (const data of dataArr) {
            if (data.period === i) {
              cellsInRow.push(
                <TableCell
                  colSpan={teaSub[data.name].length}
                  key={Math.random()}
                  align="center"
                >
                  {data.name}: {teaSub[data.name].map((item) => item + " ")}
                </TableCell>
              );
            }
          }
          cellsInRow = [<TableRow key={Math.random()}>{cellsInRow}</TableRow>];
        } else {
          for (const data of dataArr) {
            if (data.period === i) {
              cellsInRow.push(
                <TableCell
                  colSpan={teaSub[data.name].length}
                  key={Math.random()}
                  align="center"
                ></TableCell>
              );
            }
          }
          cellsInRow = [<TableRow key={Math.random()}>{cellsInRow}</TableRow>];
        }
      }
    }
    setRows(cellsInRow);
  }

  useEffect(() => {
    createTableRows(data);
  }, [data]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {/* <TableRow>
            {data.map(
                (eachData, index, id = data[0].date_period_id, num = 0) => {
                  if (eachData.date_period_id === id) {
                    num++;
                  } else {
                    id = eachData.date_period_id;
                    num = 1;
                  }
                  return (
                    <TableCell colSpan={num} key={index} align="center">
                    </TableCell>
                  );
                }
              )}
            </TableRow> */}
            <TableRow>
              <TableCell></TableCell>
              {data.map(
                (eachData, index, id = data[0].date_period_id, num = 0) => {
                  // if (eachData.date_period_id === id) {
                  //   num++;
                  // } else {
                  //   id = eachData.date_period_id;
                  //   num = 1;
                  // }
                  // console.log(num);
                  // colSpan={4}
                  return (
                    <TableCell key={index} align="center">
                      {new Date(eachData.date).toLocaleDateString()}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: 10,
              }}
              // style={{ height: 'auto !important' }}
            >
              <TableCell rowSpan={4}></TableCell>
              {data.map((eachData, index) => (
                <TableCell
                  colSpan={teaSub[eachData.name].length}
                  key={index}
                  align="center"
                >
                  {eachData.name}:{" "}
                  {teaSub[eachData.name].map((item) => item + " ")}
                </TableCell>
              ))}
            </TableRow> */}
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={() => postAvailability(avaiablity)}>Submit</Button> */}
    </>
  );
}

export default Data;
