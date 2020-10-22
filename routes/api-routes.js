const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models")


router.get("/", (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((foundWorkouts) => {
        res.json(foundWorkouts);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          error: true,
          data: null,
          message: "Failed to retrieve workouts.",
        });
      });
  });

  module.exports = router;
