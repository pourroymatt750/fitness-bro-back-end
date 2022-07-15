import { Meal } from "../models/meal.js";
import axios from "axios";

function mealSearch(req, res) {
  axios.get(`https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${req.query.search}&key=${process.env.WORKOUT_API_URL}`)
    .then(response => {
      res.json({
        results: response.data,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/`)
    })
}
export{
  mealSearch
}