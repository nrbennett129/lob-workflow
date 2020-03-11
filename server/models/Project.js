import mongoose, { Schema } from 'mongoose'
import { applyCursorsToFilter, applyPagination } from '../models/utils/pagination'

const projectSchema = new Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  edited: { type: Date },
  name: {
    type: String,
    trim: true,
    required: [true, 'Project must have a name.']
  }
})

const Project = mongoose.model('Project', projectSchema)
export default Project

export async function getAllProjects (obj, { first, last, after, before }, filterOptions) {
  let filter = {}
  if (filterOptions) {
    filter = filterOptions
  }
  applyCursorsToFilter(filter, after, before)

  const query = Project.find(filter)
  query.sort({ _id: -1 })

  const pageInfo = await applyPagination(query, first, last)

  const data = await query

  return {
    data,
    pageInfo
  }
}
