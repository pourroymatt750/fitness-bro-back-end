import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  comment: {type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true
})

const workoutSchema = new Schema({
  name: String,
  type: String,
  muscle: String,
  reviews: [reviewSchema], 

}, {
  timestamps: true
})

const Workout = mongoose.model('Workout', workoutSchema)

export {
  Workout
}