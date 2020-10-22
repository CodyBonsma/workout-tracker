const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day:{
        type: Date,
    },
    exercises: [{
    type: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    weight: {
        type: Number,
        required: false,
    },
    sets: {
        type: Number,
        required: false,
    },
    reps: {
        type: Number,
        required: false,
    },
    duration: {
        type: Number,
        required: false,
    },
    distance: {
        type: Number,
        required: false
    }
    }]
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;