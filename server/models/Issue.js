const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    required: [true, 'An Issue must be associated with Task.']
  },
  title: {
    type: String,
    required: [true, 'An Issue must have a descriptive title.']
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Pending Approval', 'Solved'],
    default: 'Open',
    required: true
  },
  linkedIssueIds: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  tags: [String]
})

module.exports = mongoose.model('Issue', issueSchema)
