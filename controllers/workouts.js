import { Workout } from "../models/workout.js";
import axios from "axios";

function workoutSearch(req, res) {
  axios.get(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${req.query.search}&key=${process.env.WORKOUT_API_URL}`)
    .then(response => {
      res.json({
        // search: req.body.search ? req.body.search : null,
        results: response.data,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/`)
    })
}
export{
  workoutSearch
}
