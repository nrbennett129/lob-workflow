import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql'
import TaskType from '../types/Task'
import TaskInput from '../inputs/TaskInput'
import Job from '../../models/Job'

const updateTaskMutation = {
  type: TaskType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(TaskInput) }
  },
  resolve: async (_source, { id, input }) => {
    const task = await Job.findById(id)
    for (const key in input) {
      task[key] = input[key]
    }
    return task.save()
  }
}

export default updateTaskMutation
