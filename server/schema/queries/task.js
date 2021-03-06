import { GraphQLID, GraphQLNonNull } from 'graphql'
import TaskType from '../types/Task'
import Job from '../../models/Job'

const taskQuery = {
  type: TaskType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the task.'
    }
  },
  resolve: (_source, { id }) => {
    return Job.findById(id)
  }
}

export default taskQuery
