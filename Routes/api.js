module.exports = router;
const router = require("express").Router();
const Workout = require("../Models/workout");


router.put("/api/workouts/:id", (req,res) => {
    Workout.findByIdAndUpdate(
        req.params.id, {$push: {exercises: req.body}}
    )

    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

router.post("/api/workouts", ({body}, res) => {

        Workout.create(body)
        .then((data) => res.json(data))
        .catch ((err) => {
        res.status(400).json(err)})
    
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate( [
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
            },
        },
    ])
    .limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: 
            {
                totalDuration: {
                    $sum: "$exercises.duration"
                },
            },
        },
    ])
    .sort({_id: -1})
    .limit(7)
    .then((data) => res.json(data))
    .catch((err => {
        res.status(400).json(err)}))
});

module.exports = router;