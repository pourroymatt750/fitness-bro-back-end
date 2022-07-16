import { Meal } from "../models/meal.js";
import axios from "axios";

function mealSearch(req, res) {
  const options = {
  method: 'GET',
  url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
  params: {query: req.query.search},
  headers: {
    'X-RapidAPI-Key': process.env.XRapidAPIKey,
  }
};

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}
export{
  mealSearch
}