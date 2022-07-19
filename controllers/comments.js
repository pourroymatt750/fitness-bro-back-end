import { Comment } from "../models/comment.js";
import { Profile } from "../models/profile.js";

// export function create(req, res) {
//   req.body.author = req.user.profile
//   Comment.create(req.body)
//   .then(comment => {
//     Profile.findById(req.params.id)
//     .then(profile => {
//       profile.comments.push(comment._id)
//       profile.save()
//       Profile.findById(profile._id)
//       .populate('comments')
//       .populate({path:'meals'})
//       .populate('workouts')
      
//       .then(populatedProfile => {
//         res.json(populatedProfile)
//       })
//     })  
//   })
// }

export function create(req, res) {
  req.body.author = req.user.profile
  Comment.create(req.body)
  .then(newComment => {
    Profile.findById(req.params.id)
    .then(profile => {
      profile.comments.push(newComment._id)
      profile.save()
      Profile.findById(profile._id)
      .populate('comments')
      .populate({path:'meals'})
      .populate('workouts')
      .then(profile => {
        profile.populate('comments')
        .then(populatedComment => {
          newComment.populate('comment')
          .then(populatedProfile => {
            res.json([populatedProfile, populatedComment])
          })
        })
      })
    })  
  })
}