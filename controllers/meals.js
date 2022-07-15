import { Meal } from "../models/meal.js";
import axios from "axios";

function mealSearch(req, res) {
  const options = {
  method: 'GET',
  url: 'https://nutritionix-api.p.rapidapi.com/v1_1/item',
  params: {upc: req.query.search},
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