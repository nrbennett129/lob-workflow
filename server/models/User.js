import mongoose, { Schema } from 'mongoose'
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

export default mongoose.model('User', userSchema)
