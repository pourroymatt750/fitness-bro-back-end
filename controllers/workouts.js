import { Workout } from "../models/workout.js";
import { Profile } from "../models/profile.js"
import axios from "axios";

function workoutSearch(req, res) {
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

function show(req, res) {
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

function addToCollection(req, res) {
  // req.body.collectedBy = req.user.profile._id
  Workout.create(req.body)
  .then((workout)=> {
    console.log(workout,"*******************")
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.workouts.push(workout)
      // workout.collectedBy.push(req.user.profile._id)
      console.log(req.user.profile,"123**************************")
        // workout.save()
        profile.save()
        res.json(workout)
    })
  })
}

export{
  workoutSearch,
  show,
  addToCollection
}

