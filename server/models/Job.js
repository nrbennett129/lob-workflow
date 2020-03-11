import mongoose, { Schema } from 'mongoose'
import { applyCursorsToFilter, applyPagination } from './utils/pagination'
import { toLower } from './utils/setters'

const jobSchema = new Schema({
  createdDate: { type: Date, default: Date.now() },
  editedDate: { type: Date },
  projectId: { type: Schema.Types.ObjectId, required: [true, 'Task must have an associated project.'] },
  startDate: { type: Date },
  dueDate: { type: Date },
  completedDate: { type: Date },
  assigneeId: { type: Schema.Types.ObjectId, ref: 'User' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewable: { type: Boolean },
  // TODO: Add custom validator for priority as integers
  priority: { type: Number, default: 1 },
  status: {
    type: String,
    set: toLower,
    enum: ['open', 'closed', 'pending approval', 'solved'],
    default: 'open',
    required: true
  },
  subject: { type: String },
  description: { type: String },
  tags: { type: [String] },
  type: { type: String, set: toLower, enum: ['task', 'issue'], default: 'issue' },
  commentIds: { type: Schema.Types.ObjectId, ref: 'Comment' },
  relatedIds: { type: [Schema.Types.ObjectId], ref: 'Task' },
  // TODO: Implement TaskHistory
  jobActionIds: [{ type: Schema.Types.ObjectId, ref: 'JobAction' }]
})

const Job = mongoose.model('Job', jobSchema)

export default Job

export async function getAllJobs (obj, { first, last, after, before }, filterOptions) {
  let filter = {}
  if (filterOptions) {
    filter = filterOptions
  }
  applyCursorsToFilter(filter, after, before)

  const query = Job.find(filter)
  query.sort({ _id: -1 })

  const pageInfo = await applyPagination(query, first, last)

  const data = await query

  return {
    data,
    pageInfo
  }
}
