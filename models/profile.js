import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  name: String,
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
