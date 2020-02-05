const db = require("../models");


module.exports = function(app){
    app.get("/api/workouts",(req,res)=>{
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout =>{
                res.json(dbWorkout);
            }).catch(err=>{
                res.json(err);
            });
    });

    app.get("/api/workouts/range",(req,res)=>{
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout =>{
                res.json(dbWorkout);
            }).catch(err=>{
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body);

        db.Exercise.create(req.body)
            .then((dbExercise) => db.Workout.findOneAndUpdate(
                {_id: req.params.id},
                { 
                    $push: {
                        exercises: dbExercise._id 
                    }, 
                    $inc: {
                        totalDuration: dbExercise.duration
                    } 
                },
                { new: true })
            )
            .then(dbWorkout => {
            res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });
      });

    app.post("/api/workouts",(req,res)=>{
        db.Workout.create({day: Date.now()})
            .then(workout=>{
                res.json(workout);
            }).catch(err=>{
                res.json(err);
            });
    });


};