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
  .populate({path: 'meals'})
  .populate('workouts')
  .populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'Profile'
    }
  })
  .then(profile => {
    res.json(profile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

// export function show(req, res) {
//   Profile.findById(req.params.id)
//   .populate({path:'meals'})
//   .populate('workouts')
//   .populate('comments.author')
//   .then(profile => {
//     console.log('THIS IS THE PROFILE:', profile)
//     const updatedComments = profile.comments.map(comment => { 
//       console.log('THIS IS THE COMMENT:', comment)
//       Profile.findById(comment.author)
//       .then(author => {
//         console.log('THIS IS THE AUTHOR:', author)
//         comment.author = author
//         console.log('THIS IS THE NEW COMMENT:', comment)
//       })
//     })
//     console.log('THIS IS THE UPDATED COMMENTS:', updatedComments)
//     profile.comments = updatedComments
//     console.log('THIS IS THE UPDATED PROFILE:', profile)
//     res.json(profile)
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json(err)
//   })
// }

export function deletedWorkout(req,res){
  Workout.findById(req.params.id)
  .then(workout =>{
    Profile.findById(req.user.profile)
    .then(profile=>{
      profile.workouts.remove(workout)
      profile.save()
        res.json(profile)
      })
  })
}
export function deletedMeal(req,res){
  Meal.findById(req.params.id)
  .then(meal =>{
    Profile.findById(req.user.profile)
    .then(profile=>{
      profile.meals.remove(meal)
      profile.save()
        res.json(profile)
      })
  })
}


