import React, { useContext } from 'react';
import { PersonContext } from "./context/personContext";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Buttons() {
  const { person, setPerson } = useContext(PersonContext);
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}

