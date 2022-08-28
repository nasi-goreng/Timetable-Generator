// server/app.js
const express = require("express");
const path = require("path");
const db = require("./knex.js");

const app = express();
app.use(express.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/subjects", async (req, res) => {
  try {
    const subjects = await db.select("subject").table("subjects");
    res.json(subjects);
  } catch (err) {
    console.error("Error loading subjects!", err);
    res.sendStatus(500);
  }
});

app.get("/date_period", async (req, res) => {
  try {
    const datePeriodArr = await db
      .select("id", "date", "period")
      .from("date_period")
      .orderBy("period")
      .orderBy("date");
    res.json(datePeriodArr);
  } catch (err) {
    console.error("Error loading date_period!", err);
    res.sendStatus(500);
  }
});

app.get("/date", async (req, res) => {
  try {
    const dateArr = await db
      .distinct("date")
      .select("date")
      .from("date_period")
      .orderBy("date");
    res.json(dateArr);
  } catch (err) {
    console.error("Error loading distinct date!", err);
    res.sendStatus(500);
  }
});

app.post("/person", async (req, res) => {
  try {
    // get a list of subject ids in an array
    let subIdNameArr = []; // [{Japanese: 1}, ...]
    try {
      const subObj = req.body.subjects; // { Japanese: true, Math: false, ...}
      const subArr = []; // [Japanese, ...]
      for (const key in subObj) {
        if (subObj[key]) {
          subArr.push(key);
        }
      }
      subIdNameArr = await db // [ { id: 1, subject: Japanese }, { id: }, ...]
        .select()
        .from("subjects")
        .whereIn("subject", subArr);
    } catch (err) {
      console.error("Error loading subject id list!", err);
      res.sendStatus(500);
    }

    // insert names in students or teachers table
    const stuOrTea = req.body.stuOrTea;
    const name = req.body.name;
    let idObjArr;

    try {
      idObjArr = await db // [ { id: 24 } ] you can't chain .first() on insert
        .insert({
          name: name,
        })
        .into(`${stuOrTea}s`)
        .returning("id");
    } catch (err) {
      console.error("Error loading person id!", err);
      res.sendStatus(500);
    }

    // insert student_id and subject_ids and the num of subjects into students_subjects table
    try {
      for (const subIdName of subIdNameArr) {
        await db
          .insert({
            [`${stuOrTea}_id`]: idObjArr[0].id,
            subject_id: subIdName.id,
            num: req.body.subjects[subIdName.subject],// req.body から各科目のコマ数を持ってきてここにいれる
          })
          .into(`${stuOrTea}s_subjects`);
      }
    
      // ちゃんと入ってるかコンソールで確認するため
      // try {
      //   const output = await db.select().from(`${stuOrTea}s_subjects`);
      //   console.log(output);
      // } catch (err) {
      //   console.error("Error getting students/teachers_subjects!", err);
      //   res.sendStatus(500);
      // }

    } catch (err) {
      console.error("Error inserting subject ids!", err);
      res.sendStatus(500);
    }

    res.send(String(idObjArr[0].id));
  } catch (err) {
    console.error("Error loading person id!", err);
    res.sendStatus(500);
  }
});

app.post("/availability", async (req, res) => {
  try {
    await db
      .insert({
        date_period_id: req.body.date_period_id,
        [`${req.body.stuOrTea}_id`]: req.body.person_id,
        isAvailable: false,
      })
      .into(`${req.body.stuOrTea}_availability`);
    console.log("INSERTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error inserting avaiablity", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
