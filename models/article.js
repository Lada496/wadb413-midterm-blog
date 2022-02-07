const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      type: String,
      // _id: false
    },
  ],
  // like: {
  //     type: Number,
  //     default: 0
  // }
  like: [
    {
      type: String,
    },
  ],
});

articleSchema.methods.countLike = function () {
  let newCount = 0;
  newCount = +1;

  this.like = newCount;
  return this.save();
};

// articleSchema.methods.addComment = function(comment) {

//     const updatedComment = [...this.comment, ]
//     console.log(comment)
//     console.log(updatedComment)

//     updatedComment.push({comment: comment})

//     this.comment = updatedComment
//     return this.save()
// }

module.exports = mongoose.model("Article", articleSchema);