import React, { useEffect, useState } from "react";
import axios from "axios";

function Json() {
  const [json, setJson] = useState([1, 2, 3]);
  useEffect(() => {
    async function fetchAvailableTeachers() {
      const { data: response } = await axios.get("/available_teachers");
      // console.log(response);
      const stringObj = response.map((obj) => JSON.stringify(obj));
      setJson(stringObj);
      // setJson(response);
    }
    fetchAvailableTeachers();
  }, []);
  return (
    // <div>{json}</div>
    <ul>
      {json.map((x, index) => (
        <li key={index}><pre>{x}</pre></li>
      ))}
    </ul>
  );
}

export default Json;
