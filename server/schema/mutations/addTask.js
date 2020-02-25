import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import TaskType from '../types/Task'
import TaskInput from '../inputs/TaskInput'
import Task from '../../models/Task'

const taskMutation = {
  type: TaskType,
  args: {
    dealId: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: TaskInput }
  },
  resolve: (_source, { dealId, input }) => {
    const task = new Task({
      dealID: dealId,
      ...input
    })
    return task.save()
  }
}

export default taskMutation
