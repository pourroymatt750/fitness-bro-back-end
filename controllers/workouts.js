import { Workout } from "../models/workout.js";
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
export{
  workoutSearch
}

