import mongoose, { Schema } from 'mongoose'

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

export default mongoose.model('Project', projectSchema)
