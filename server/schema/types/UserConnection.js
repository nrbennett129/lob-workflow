import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import PageInfoType from './PageInfo'
import UserEdgeType from './UserEdge'

const UserConnectionType = new GraphQLObjectType({
  name: 'UserConnection',
  fields: () => ({
    // TODO: Consider renaming this field to 'data'
    data: { type: GraphQLList(UserEdgeType) },
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

export default UserConnectionType
