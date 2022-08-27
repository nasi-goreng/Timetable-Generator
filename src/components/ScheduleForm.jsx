import React, { useContext, useState, useEffect } from "react";
import { PersonContext } from "../context/personContext";
import { fetchDatePeriod, fetchDistinctDate } from "../createData/createData";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ScheduleForm() {
  const { person, setPerson } = useContext(PersonContext);
  const [dates, setDates] = useState([]);
  const [datesArr, setDatesArr] = useState([]);
  const [datePeriods, setDatePeriods] = useState([]);
  const [tableData, setTableData] = useState([]);
  // const [disabled, setDisabled] = useState(false);

  // date and period data from database when mounting
  useEffect(() => {
    fetchDistinctDate().then((result) => setDates(result));
    fetchDatePeriod().then((result) => {
      // add disabled prop to each datePeriod object
      for (const datePeriod of result) {
        datePeriod.disabled = false;
      }
      setDatePeriods(result);
    }
    )}, []);

  // create an array of date strings, when dates has the data
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

  // create an array of table cells, when datePeriods has the data
  useEffect(() => {
    if (datePeriods.length) {
      const tableCells = [];
      for (let i = 0; i < datePeriods.length; ) {
        const row = [];
        for (let j = 0; j < 7; j++) {
          row.push(
            <TableCell key={datePeriods[i].id} align="center">
              <button
                value={datePeriods[i].id}
                disabled={datePeriods[i].disabled}
                onClick={updateAvailability}
              >
                {datePeriods[i].period}
              </button>
            </TableCell>
          );
          i++;
        }
        tableCells.push(row);
      }
      setTableData(tableCells);
    }
  }, [datePeriods]);

  async function updateAvailability(e) {
    try {
      const dataToSend = {
        date_period_id: e.target.value,
        person_id: person.id,
        stuOrTea: person.stuOrTea,
      };
      await axios.post("/availability", dataToSend).then(
        () => {/*console.log("inserted!")*/},
        (err) => console.error("Error when inserting!", err)
      );

      const copyDatePeriods = JSON.parse(JSON.stringify(datePeriods));
      // console.log("copy: ");
      // console.log(copyDatePeriods);
      for (let i = 0; i < copyDatePeriods.length; i++) {
        if (copyDatePeriods[i].id === +e.target.value) {
          copyDatePeriods[i].disabled = true;
        }
      }
      setDatePeriods(copyDatePeriods);
    } catch (err) {
      console.error("Cannot post availability", err);
    }
  }

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
