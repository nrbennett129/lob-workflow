const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  issueId: {
    type: Schema.Types.ObjectId, 
    ref: 'Issue',
    required: [true, 'Comment must be associated with an Issue.']
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must be associated with a User.']
  },
  posted: {
    type: Date,
    default: Date.now(),
    required: true
  },
  text: {
    type: String,
    required: [true, 'Cannot post a blank comment.']
  }
});

module.exports = mongoose.model('Comment', commentSchema);