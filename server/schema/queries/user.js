import { GraphQLID, GraphQLNonNull } from 'graphql'
import UserType from '../types/User'
import User from '../../models/User'

const userQuery = {
  type: UserType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the user.'
    }
  },
  resolve: (obj, { id }) => {
    return User.findById(id)
  }
}

export default userQuery
