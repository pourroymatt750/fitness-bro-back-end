import mongoose from "mongoose";


const mealsSchema=new mongoose.Schema({
  Name:{type:String},
  Calories:{type:Number},
  Protien:{type:Number},
  Fats:{type:Number},
  Carbs:{type:Number},
})

const Meal = mongoose.model("Meal", mealsSchema)
export{
  Meal
} 