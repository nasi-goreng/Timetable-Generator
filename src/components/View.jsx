import React, { useContext } from "react";
import { PersonContext } from "../context/personContext";
import CheckIn from "./CheckIn";
// import { Student, Teacher } from "./CheckIn";
import PersonDisplay from "./PersonDisplay";

function View() {
  const { person, setPerson } = useContext(PersonContext);

  if (!person.id) {
    return <CheckIn />;
  } else {
    return <PersonDisplay />;
  }
}

export default View;
