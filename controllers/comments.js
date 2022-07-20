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
      Profile.findById(profile._id)
      .then(populatedProfile => {
        res.json(populatedProfile)
      })
    })  
  })
}

export function deleteComment(req,res) {
  Comment.findById(req.params.id)
  .then(comment => {
    Profile.findById(req.user.profile)
    .then(profile => {
      console.log(profile)
      profile.comments.remove(comment)
      profile.save()
      // Profile.findById(profile._id)
      .then(populatedProfile => {
        res.json(populatedProfile)
      })
    })  
  })
}
