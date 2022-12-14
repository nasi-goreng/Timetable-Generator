import React, { useContext, useState, useEffect } from "react";
import { DatesContext, PersonContext } from "../context";
import { fetchDatePeriod, fetchDistinctDate } from "../createData/createData";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

export default function ScheduleForm() {
  const { person, setPerson } = useContext(PersonContext);
  const { dates, setDates } = useContext(DatesContext);
  // const [dates, setDates] = useState([]);
  const [datePeriods, setDatePeriods] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [avaiablity, setAvailability] = useState([]);
  // const [disabled, setDisabled] = useState(false);

  // get date and period data from database when mounting
  useEffect(() => {
    // fetching just dates WAS moved to Tabs
    fetchDatePeriod().then((result) => {
      // add disabled prop to each datePeriod object
      for (const datePeriod of result) {
        datePeriod.disabled = false;
      }
      setDatePeriods(result);
    });
  }, []);

  // create an array of table cells with period buttons, when datePeriods has the data
  useEffect(() => {
    if (datePeriods.length) {
      const tableCells = [];
      for (let i = 0; i < datePeriods.length; ) {
        const row = [];
        for (let j = 0; j < 7; j++) {
          row.push(
            <TableCell key={datePeriods[i].id} align="center">
              <Button
                value={datePeriods[i].id}
                disabled={datePeriods[i].disabled}
                onClick={updateAvailability}
                variant="outlined"
              >
                {datePeriods[i].period}
              </Button>
            </TableCell>
          );
          i++;
        }
        tableCells.push(row);
      }
      setTableData(tableCells);
    }
  }, [datePeriods]);

  function updateAvailability(e) {
    // add data of clicked period to the availability state
    const clickedPeriod = {
      date_period_id: e.target.value,
      person_id: person.id,
      stuOrTea: person.stuOrTea,
    };
    const copyAvailability = JSON.parse(JSON.stringify(avaiablity));
    copyAvailability.push(clickedPeriod);
    setAvailability(copyAvailability);

    // disable button
    const copyDatePeriods = JSON.parse(JSON.stringify(datePeriods));
    for (let i = 0; i < copyDatePeriods.length; i++) {
      if (copyDatePeriods[i].id === +e.target.value) {
        copyDatePeriods[i].disabled = true;
      }
    }
    setDatePeriods(copyDatePeriods);
  }

  // insert data into database by post
  async function patchAvailability(data) {
    for (const eachData of data) {
      try {
        await axios.patch("/availability", eachData).then(
          () => {
            return;
          },
          (err) => console.error("Error when inserting!", err)
        );
      } catch (err) {
        console.error("Cannot post availability", err);
      }
    }
    // setAvailability([]);
    // ?????????submit????????????????????????submit?????????availability state????????????????????????????????????
    // useState????????????????????????????????????????????????
    // ???????????????????????????????????????????????????????????????????????????????????????????????????
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {dates.map((date, index) => (
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
      <Button variant="contained" onClick={() => patchAvailability(avaiablity)}>Submit</Button>
    </>
  );
}
