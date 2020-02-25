const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    required: [true, 'User must have an email.']
  },
  phone: { 
    type: String,
    trim: true 
  },
  roles: [String]
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

module.exports = mongoose.model('User', userSchema)
