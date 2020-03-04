import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import TaskType from '../types/Task'
import TaskInput from '../inputs/TaskInput'
import Job from '../../models/Job'

const taskMutation = {
  type: TaskType,
  args: {
    projectId: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: TaskInput }
  },
  resolve: (_source, { projectId, input }) => {
    const task = new Job({
      projectId: projectId,
      ...input,
      type: 'task'
    })
    return task.save()
  }
}

export default taskMutation
