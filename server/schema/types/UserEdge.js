import {
  GraphQLObjectType
} from 'graphql'
import UserType from './User'
import CursorType from './Cursor'

const UserEdgeType = new GraphQLObjectType({
  name: 'UserEdge',
  fields: () => ({
    user: {
      type: UserType,
      resolve: (obj) => {
        // May not need this resolver
        return obj
      }
    },
    cursor: {
      type: CursorType,
      resolve: (obj) => {
        return obj.id.toString()
      }
    }
  })
})

export default UserEdgeType
