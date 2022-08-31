function createTableCells(objByPeriod) {
  const copy = rowsPerPeriod;
  for (const period in objByPeriod) {
    const cellsByRow = [];

    // teacher row
    for (const eachData of objByPeriod[period]) {
      if (eachData.isAvailable) {
        cellsByRow.push(
          <TableCell key={eachData.uniqId} align="center">
            {eachData.name}:{" "}
            {teaSub[eachData.name]?.map((subject) => subject.slice(0, 2) + " ")}
          </TableCell>
        );
      } else {
        cellsByRow.push(
          <TableCell key={eachData.uniqId} align="center"></TableCell>
        );
      }
    }
    copy[period].push(cellsByRow);

    // student rows
    for (let i = 0; i < 3; i++) {
      const stuCells = [];
      for (const eachData of objByPeriod[period]) {
        stuCells.push(<TableCell key={eachData.uniqId + i}></TableCell>);
      }
      stuCells.unshift(<TableCell key={period - 5}>{period}</TableCell>);
      copy[period].push(stuCells);
    }
  }

  setRowsPerPeriod(copy);
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
