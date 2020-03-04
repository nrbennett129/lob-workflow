import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import PageInfoType from './PageInfo'
import CommentEdgeType from './CommentEdge'

const CommentConnectionType = new GraphQLObjectType({
  name: 'CommentConnection',
  fields: () => ({
    // TODO: Consider renaming this field to 'data'
    data: { type: GraphQLList(CommentEdgeType) },
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

export default CommentConnectionType
