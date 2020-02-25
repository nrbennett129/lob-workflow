import { GraphQLList } from 'graphql'
import UserType from '../types/User'
import User from '../../models/User'

const usersQuery = {
  type: GraphQLList(UserType),
  description: 'Returns all the Users',
  resolve: () => {
    return User.find({})
  }
}

export default usersQuery
