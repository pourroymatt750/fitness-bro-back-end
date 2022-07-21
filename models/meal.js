import mongoose from "mongoose";

const Schema = mongoose.Schema

const mealsSchema = new Schema({
  name:{type:String},
  calories:{type:String},
  protein_g:{type:String},
  carbohydrates_total_g:{type:String},
})

const Meal = mongoose.model("Meal", mealsSchema)
export{
  Meal
} 