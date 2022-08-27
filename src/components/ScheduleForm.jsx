import React, { useContext, useState, useEffect } from "react";
import { PersonContext } from "../context/personContext";
import { fetchDatePeriod, fetchDistinctDate } from "../createData/createData";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ScheduleForm() {
  const { person, setPerson } = useContext(PersonContext);
  const [dates, setDates] = useState([]);
  const [datesArr, setDatesArr] = useState([]);
  const [datePeriods, setDatePeriods] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchDistinctDate().then((result) => setDates(result));
    fetchDatePeriod().then((result) => setDatePeriods(result));
  }, []);

  console.log(datePeriods);

  useEffect(() => {
    if (dates.length) {
      const datesArr = [];
      dates.forEach((dateObj) => {
        const newDate = new Date(dateObj.date);
        datesArr.push(newDate.toLocaleDateString());
      });
      setDatesArr(datesArr);
    }
  }, [dates]);

  // console.log([datesArr]);

  useEffect(() => {
    if (datePeriods.length) {
      const tableCells = [];
      for (let i = 0; i < datePeriods.length; ) {
        const row = [];
        for (let j = 0; j < 7; j++) {
          row.push(
            <TableCell align="center">
              <button>{datePeriods[i].period}</button>
            </TableCell>
          );
          i++;
        }
        tableCells.push(row);
      }
      setTableData(tableCells);
    }
  }, [datePeriods]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {datesArr.map((date, index) => (
              <TableCell key={index} align="center">
                {date}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {[...row]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
