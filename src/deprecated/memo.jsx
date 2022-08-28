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

{
  /* <TableRow>
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
            </TableRow> */
}

// colSpan={4}


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


<TableRow>
<TableCell></TableCell>
{dataPerPeriod[maxPeriod]?.map(
  (eachData, index, id = data[0].date_period_id, num = 0) => {
    return (
      <TableCell key={eachData.uniqId} align="center">
        {new Date(eachData.date).toLocaleDateString()}
      </TableCell>
    );
  }
)}
</TableRow>

<TableBody>
{rows.map((row, index) => (
  <TableRow
    key={index}
    sx={{
      "&:last-child td, &:last-child th": { border: 0 },
      height: 10,
    }}
    // style={{ height: 'auto !important' }}
  >
    {row}
  </TableRow>
))}
</TableBody>

createTableCells
const rowCellsArr = [];
for (const period in objByPeriod) {
const rowCells = objByPeriod[period].map((eachData, index) => (
  <TableCell key={eachData.uniqId} align="center">
    {eachData.name}:{" "}
    {teaSub[eachData.name]?.map((subject) => subject + " ")}
  </TableCell>
));
rowCells.unshift(<TableCell>{period}</TableCell>);
rowCellsArr.push(rowCells);
}
// console.log(rowCellsArr);