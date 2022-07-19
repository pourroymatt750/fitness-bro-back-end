import { Comment } from "../models/comment.js";
import { Profile } from "../models/profile.js";

export function create(req, res) {
  req.body.author = req.user.profile
  Comment.create(req.body)
  .then(comment => {
    console.log(comment)
    Profile.findById(req.user.profile)
    .populate('comments')
    .then(profile => {
      profile.comments.push(comment)
      profile.save()
      console.log(profile)
      res.json(comment)
    })  
  })
}