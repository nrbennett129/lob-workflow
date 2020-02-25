const graphql = require('graphql')
const TaskType = require('../types/Task')
const TaskInput = require('../inputs/TaskInput')
const Task = require('../../models/Task')

const {
  GraphQLNonNull
} = graphql

const taskMutation = {
  type: TaskType,
  args: {
    input: {
      type: new GraphQLNonNull(TaskInput)
    }
  },
  resolve: (_source, { input }) => {
    // code to get data from db or other source
    const task = new Task(input)
    return task.save()
  }
}

module.exports = taskMutation
