const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models")


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
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

router.post("/api/workouts", (req, res) => {
    console.log(res.body)
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
        console.log("successfully created a new workout");
    }).catch((err) => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create a new workout"
        });
    })
});

// PUT route to update workout by ID
router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params)
    let userId = req.params.id;
    console.log("hit the update route for working with ID");
    db.Workout.findByIdAndUpdate({_id: userId}, {
        $push:{ exercises: {
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
    }}}, {new: true}, 
    ).then((updatedWorkout) =>{
        console.log(updatedWorkout);
        res.json(updatedWorkout);
    }).catch((err) =>{
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create a new workout"
        });
    })
})

module.exports = router;
