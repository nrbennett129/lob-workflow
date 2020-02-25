const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  dealId: { type: Schema.Types.ObjectId, required: [true, 'Task must have a deal associated.'] },
  startDate: { type: Date },
  dueDate: { type: Date },
  createdDate: { type: Date, default: Date.now() },
  completedDate: { type: Date },
  assignedToId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdById: { type: Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  // TODO: Implement TaskHistory
  // taskHistory: [{type: Schema.Types.ObjectId, ref: 'TaskAction'}],
  subject: { type: String }
})

module.exports = mongoose.model('Task', taskSchema)
