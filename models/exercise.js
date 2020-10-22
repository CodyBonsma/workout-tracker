const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    exerciseType: {
        type: String, // or a choice between cardio and resistance?
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    // add duration to the workout if exercise type == cardio (how?)
})

const exercise = mongoose.model("exercise", ExerciseSchema);

module.exports = exercise;