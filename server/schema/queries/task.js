import { GraphQLID, GraphQLNonNull } from 'graphql'
import TaskType from '../types/Task'
import Task from '../../models/Task'

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

export default taskQuery
