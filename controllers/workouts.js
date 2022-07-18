import { Workout } from "../models/workout.js";
import { Profile } from "../models/profile.js"
import axios from "axios";

export function workoutSearch(req, res) {
  const options = {
    method: 'GET',
    url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: {muscle: req.query.search},
    headers:{
      'X-RapidAPI-Key': process.env.XRapidAPIKey,
    }
  };
  axios.request(options).then(function (response) {
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  });
}

export function show(req, res) {
  const options = {
    method: 'GET',
    url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: {name: req.params.exerciseName},
    headers:{
      'X-RapidAPI-Key': process.env.XRapidAPIKey,
    }
  };
  axios.request(options)
    .then(function (response) {
    res.json(response.data)
  }).catch(function (error) {
    console.error(error)
  });
}

export function addToCollection(req, res) {
  // req.body.collectedBy = req.user.profile._id
  Workout.create(req.body)
  .then((workout)=> {
    Profile.findById(req.user.profile)
    .populate('workouts')
    .then(profile => {
      workout.collectedBy.push(req.user.profile)
      profile.workouts.push(workout)
      workout.save()
      profile.save()
      res.json(workout)
    })
  })
}



export{
  // workoutSearch,
  // show,
  // addToCollection
}

