import { Meal } from "../models/meal.js";
import { Profile } from "../models/profile.js";
import axios from "axios";

export function mealSearch(req, res) {
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
export async function addToCollection(req, res) {
  try{
    const newMeal = await Meal.create(req.body)
    console.log("newMealId",newMeal._id)
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { meals: newMeal } }
    )
    res.json(newMeal)
  }catch(err){
    console.log(err)
  }
}

