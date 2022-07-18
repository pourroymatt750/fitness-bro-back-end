import { Meal } from "../models/meal.js";
import { Profile } from "../models/profile.js";
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
function addToCollection(req, res) {
  // req.body.collectedBy = req.user.profile._id
  Meal.create(req.body)
  .then((meal)=> {
    Profile.findById(req.user.profile)
    .populate('meals')
    .then(profile => {
      meal.collectedBy.push(req.user.profile._id)
      profile.meals.push(meal)
      profile.save()
      meal.save()
      res.json(meal)
    })
  })
}
export{
  mealSearch,
  addToCollection
}