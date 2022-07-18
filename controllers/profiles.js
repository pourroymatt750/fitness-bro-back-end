import { Profile } from '../models/profile.js'
import { Workout } from '../models/workout.js'

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
export function removeFromCollection(req,res){
  Workout.findByIdAndDelete(req.body)
  .then((workout)=> {
    Profile.findById(req.user.profile)
    .then(profile => {
      workout.collectedBy.remove(req.user.profile)
      profile.workouts.remove(workout)
      workout.save()
      profile.save()
      res.json(workout)
    })
  })
}

// export { index, show }
