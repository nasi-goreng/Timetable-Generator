// import axios from "axios";
const axios = require("axios");

export const fetchDatePeriod = async () => {
  try {
    const { data: response } = await axios.get("/date_period");
    return response;
  } catch (err) {
    console.error("Cannot get date_period data", err);
  }
};

export const fetchDistinctDate = async () => {
  try {
    const { data: response } = await axios.get("/date");
    return response;
  } catch (err) {
    console.error("Cannot get distinct date data", err);
  }
};
