import React, {useContext} from 'react';
import { DatesContext } from '../context';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Data() {
  const {dates, setDates} = useContext(DatesContext);
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
          {/* {tableData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {[...row]}
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <Button onClick={() => postAvailability(avaiablity)}>Submit</Button> */}
  </>
  )
}

export default Data