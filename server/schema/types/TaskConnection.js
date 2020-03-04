import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import PageInfoType from './PageInfo'
import TaskEdgeType from './TaskEdge'

const TaskConnectionType = new GraphQLObjectType({
  name: 'TaskConnection',
  fields: () => ({
    // TODO: Consider renaming this field to 'data'
    data: { type: GraphQLList(TaskEdgeType) },
    pageInfo: {
      type: PageInfoType,
      resolve: (obj) => {
        return {
          startCursor: obj.data[0].id || null,
          endCursor: obj.data[obj.data.length - 1].id || null,
          hasNextPage: obj.pageInfo.hasNextPage,
          hasPreviousPage: obj.pageInfo.hasPreviousPage
        }
      }
    }
  })
})

export default TaskConnectionType
