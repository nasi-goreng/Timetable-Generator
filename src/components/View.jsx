import React, { useContext } from "react";
import { PersonContext } from "../context/personContext";
import CheckIn from "./CheckIn";
// import { Student, Teacher } from "./CheckIn";
import PersonDisplay from "./PersonDisplay";
import ScheduleForm from "./ScheduleForm";

function View() {
  const { person, setPerson } = useContext(PersonContext);

  if (!person.id) {
    return <CheckIn />;
  } else {
    return (
      <>
        <PersonDisplay />
        <ScheduleForm />
      </>
    );
  }
}

export default View;
