import TaskConnectionType from '../types/TaskConnection'
import { getAllJobs } from '../../models/Job'
import { GraphQLInt } from 'graphql'
import CursorType from '../types/Cursor'

const allTasksQuery = {
  type: TaskConnectionType,
  args: {
    first: { type: GraphQLInt },
    last: { type: GraphQLInt },
    after: { type: CursorType },
    before: { type: CursorType }
  },
  resolve: async (obj, { first, last, after, before }) => {
    const filterOpts = { type: 'task' }
    const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
    return {
      data,
      pageInfo
    }
  }
}

export default allTasksQuery
