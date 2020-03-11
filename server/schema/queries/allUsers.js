import { GraphQLInt } from 'graphql'
import CursorType from '../types/Cursor'
import { getAllUsers } from '../../models/User'
import UserConnectionType from '../types/UserConnection'

const allUsersQuery = {
  type: UserConnectionType,
  description: 'Returns all the Users',
  args: {
    first: { type: GraphQLInt },
    last: { type: GraphQLInt },
    after: { type: CursorType },
    before: { type: CursorType }
  },
  resolve: async (obj, { first, last, after, before }) => {
    const { data, pageInfo } = await getAllUsers(obj, { first, last, after, before })
    return {
      data,
      pageInfo
    }
  }
}

export default allUsersQuery
