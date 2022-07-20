import { Comment } from "../models/comment.js";
import { Profile } from "../models/profile.js";

export function create(req, res) {
  req.body.author = req.user.profile
  Comment.create(req.body)
  .then(comment => {
    Profile.findById(req.params.id)
    .then(profile => {
      profile.comments.push(comment._id)
      profile.save()
      .then(savedProfile =>{
        Profile.findById(req.params.id)
        .populate({path: 'meals'})
        .populate('workouts')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'Profile'
          }
        })
        .then(populatedProfile => {
          console.log(populatedProfile)
          res.json(populatedProfile)
        })
      })
    })  
  })
}

export function deleteComment(req,res) {
  Comment.findById(req.params.id)
  .then(comment => {
    console.log(comment,"*******")
    Profile.findById(req.params.profileId)
    .then(profile => {
      profile.comments.remove(comment)
      profile.save()
      .then(savedProfile =>{
        Profile.findById(req.params.profileId)
        .populate({path: 'meals'})
        .populate('workouts')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'Profile'
          }
        })
        .then(populatedProfile => {
          // console.log(profile,"123456")
          res.json(populatedProfile)
        })
      })
    })  
  })
}

export function show(req, res) {
  Comment.findById(req.params.id)
  .then(comment => {
    res.json(comment)
  })
}
