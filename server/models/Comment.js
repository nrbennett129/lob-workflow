import mongoose, { Schema } from 'mongoose'
import { applyCursorsToFilter, applyPagination } from './utils/pagination'

const commentSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Comment must be associated with a Job.']
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
})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment

export async function getAllComments (connField, obj, { first, last, after, before }) {
  const filter = {
    [connField]: obj.id
  }
  applyCursorsToFilter(filter, after, before)

  const query = Comment.find(filter)
  query.sort({ _id: -1 })

  const pageInfo = await applyPagination(query, first, last)

  const data = await query

  return {
    data,
    pageInfo
  }
}
