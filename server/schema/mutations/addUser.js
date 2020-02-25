import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql'
import UserType from '../types/User'
import User from '../../models/User'

const userMutation = {
  type: UserType,
  args: {
    first: { type: new GraphQLNonNull(GraphQLString) },
    last: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    roles: { type: new GraphQLList(GraphQLString) }
  },
  resolve: (_source, args) => {
    // code to get data from db or other source
    const user = new User({
      first: args.first,
      last: args.last,
      email: args.email,
      phone: args.phone,
      rolse: args.roles
    })
    return user.save()
  }
}

export default userMutation
