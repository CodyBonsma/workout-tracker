const express = require("express");
const router = express.Router();
const path = require("path");

const db = require("../models")

// render homepage 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})
// render exercise page 
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
})
// render stats page 
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
})

// route to retrieve workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((foundWorkouts) => {
            console.log("found workout informaiton: ", foundWorkouts)
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

// route to create a new workout 
router.post("/api/workouts", (req, res) => {
    console.log(req.body)
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
    db.Workout.findByIdAndUpdate({ _id: userId }, {
        $push: {
            exercises: {
                type: req.body.type,
                name: req.body.name,
                distance: req.body.distance,
                duration: req.body.duration,
                weight: req.body.weight,
                reps: req.body.reps,
                sets: req.body.sets,
            }
        }
    }, { new: true },
    ).then((updatedWorkout) => {
        console.log(updatedWorkout);
        res.json(updatedWorkout);
    }).catch((err) => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create a new workout"
        });
    })
})

// route to get data to render stats page
router.get("/api/workouts/range", (req,res) => {
    console.log(req.body);
})

module.exports = router;
