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
  // req.body.collectedBy = req.user.profile._id
  try{
    const newMeal = await Meal.create(req.body)
    console.log("newMealId",newMeal._id)
    // const meal = await Meal.findById(newMeal._id)
    // console.log("meal",meal)
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { meals: newMeal } }
    )
    // const profile = await Profile.findById(req.user.profile)
    // // console.log(profile)
    // profile.meals.push(newMeal)
    // await profile.save()
    // console.log("*****ADDMEAL",profile)
    res.json(newMeal)
  }catch(err){
    console.log(err)
  }
  // console.log("!!^#^&$%",req.body)
  // Meal.create(req.body)
  // .then((meal)=> {
  //   Profile.findById(req.user.profile)
  //   .then(profile => {
  //     console.log("meal",meal)
  //     console.log("^!$#!^",profile)
  //     profile.meals.push(meal._id)
  //     profile.save()
  //     .then(()=>{
  //       console.log("line33",profile)
  //       res.json(meal)
  //     })
  //   })
  // })
}
// export{
//   mealSearch,
//   addToCollection
// }