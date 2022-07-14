import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  comment: {type: String, required: true },
}, {
  timestamps: true
})

const workoutSchema = new Schema({
  name: String,
  description: String,
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}