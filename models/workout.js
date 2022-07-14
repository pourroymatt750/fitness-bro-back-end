import mongoose from "mongoose"

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  name: String,
  description: String,
  reviews: [reviewSchema]
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}