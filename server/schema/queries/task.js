const graphql = require('graphql')
const TaskType = require('../types/Task')
const Task = require('../../models/Task')

const { GraphQLID, GraphQLNonNull } = graphql

const taskQuery = {
  type: TaskType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the task.'
    }
  },
  resolve: (_source, { id }) => {
    // code to get data from db or other source
    return Task.findById(id)
  }
}

module.exports = taskQuery
