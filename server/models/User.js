import mongoose, { Schema } from 'mongoose'
import { applyCursorsToFilter, applyPagination } from './utils/pagination'
import { toLower } from './utils/setters'

const userSchema = new Schema({
  first: {
    type: String,
    trim: true,
    required: [true, 'User must have a first name.']
  },
  last: {
    type: String,
    trim: true,
    required: [true, 'User must have a last name.']
  },
  email: {
    type: String,
    trim: true,
    set: toLower,
    required: [true, 'User must have an email.']
  },
  phone: {
    type: String,
    trim: true
  },
  roles: {
    type: [String],
    set: toLower
  }
})

userSchema
  .virtual('name')
  .get(function () {
    let fullname = ''
    if (this.first && this.last) {
      fullname = `${this.last}, ${this.first}`
    }
    return fullname
  })

const User = mongoose.model('User', userSchema)
export default User

export async function getAllUsers (obj, { first, last, after, before }, filterOptions) {
  let filter = {}
  if (filterOptions) {
    filter = filterOptions
  }
  applyCursorsToFilter(filter, after, before)

  const query = User.find(filter)
  query.sort({ _id: -1 })

  const pageInfo = await applyPagination(query, first, last)

  const data = await query

  return {
    data,
    pageInfo
  }
}
