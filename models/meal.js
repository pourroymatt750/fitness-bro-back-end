import mongoose from "mongoose";


const mealsSchema=new mongoose.Schema({
  name:{type:String},
  calories:{type:Number},
  protien:{type:Number},
  fats:{type:Number},
  carbs:{type:Number},
})

const Meal = mongoose.model("Meal", mealsSchema)
export{
  Meal
} 