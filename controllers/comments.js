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
export function update(req, res) {
  console.log(req.body)
  console.log("params",req.params.id)
  Comment.findById(req.params.id)
  .then(comment => {
    console.log("comment",comment)
    if(comment.author.equals(req.user.profile)){
      comment.comment = req.body.comment
      comment.save()
      .then(()=>{
        return res.json(comment)
      })
    }else{
      return res.status(500).json({err:'Not Allowed'})
    }
  })
}

