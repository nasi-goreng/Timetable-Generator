import React, { useContext, useEffect } from "react";
import { PersonContext, DatesContext } from "../context";
import { fetchDatePeriod, fetchDistinctDate } from "../createData/createData";
import View from "./View";
import Data from "./Data";
import Json from "../deprecated/Json";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { dates, setDates } = useContext(DatesContext);

  // get dates
  useEffect(() => {
    fetchDistinctDate().then((result) => {
      const dates = [];
      result.forEach((dateObj) => {
        const newDate = new Date(dateObj.date);
        dates.push(newDate.toLocaleDateString());
      });
      setDates(dates);
    });
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { person, setPerson } = useContext(PersonContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Form" {...a11yProps(0)} />
          <Tab label="Data" {...a11yProps(1)} />
          <Tab label="Json" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <View />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Data />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Json />
      </TabPanel>
    </Box>
  );
}
