import {
  GraphQLObjectType
} from 'graphql'
import TaskType from './Task'
import CursorType from './Cursor'

const TaskEdgeType = new GraphQLObjectType({
  name: 'TaskEdge',
  fields: () => ({
    task: {
      type: TaskType,
      resolve: (taskEdge) => {
        // May not need this resolver
        return taskEdge
      }
    },
    cursor: {
      type: CursorType,
      resolve: (taskEdge) => {
        return taskEdge.id.toString()
      }
    }
  })
})

export default TaskEdgeType
