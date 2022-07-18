import { Profile } from '../models/profile.js'
import { Workout } from '../models/workout.js'
import { Meal } from '../models/meal.js'
export function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export function show(req, res) {
  Profile.findById(req.params.id)
  .populate({path:'meals'})
  .populate('workouts')
  .then(profile => {
    res.json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}
// export function removeFromCollection(req,res){
//   Workout.findByIdAndDelete(req.body)
//   .then((workout)=> {
//     Profile.findById(req.user.profile)
//     .then(profile => {
//       workout.collectedBy.remove(req.user.profile)
//       profile.workouts.remove(workout)
//       workout.save()
//       profile.save()
//       res.json(workout)
//     })
//   })
// }
export function deletedWorkout(req,res){
  console.log("WORKOUT:", req.params.id)
  Workout.findById(req.params.id)
  .then(workout =>{
    Profile.findById(req.user.profile)
    .then(profile=>{
      profile.workouts.remove(workout)
      profile.save()
      console.log('******',profile)
        res.json(profile)
      })
  })
}
export function deletedMeal(req,res){
  console.log("MEAL:", req.params.id)
  Meal.findById(req.params.id)
  .then(meal =>{
    Profile.findById(req.user.profile)
    .then(profile=>{
      profile.meals.remove(meal)
      profile.save()
      console.log('******',profile)
        res.json(profile)
      })
  })
}
// export { index, show }
