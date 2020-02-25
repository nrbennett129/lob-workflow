import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import TaskType from './Task'
import Task from '../../models/Task'

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    first: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The given name of the user.'
    },
    last: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The surname of the user.'
    },
    name: {
      type: GraphQLString,
      description: 'The full name of the user in LAST, FIRST format.'
    },
    email: {
      type: GraphQLString,
      description: 'The email address of the user.'
    },
    phone: {
      type: GraphQLString,
      description: 'The primary phone number of the user.'
    },
    roles: {
      type: new GraphQLList(GraphQLString),
      description: 'The roles the user has in the workflow. The first item of the array will be the primary role'
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (_source) => {
        return Task.find({ assignedToId: _source.id })
      }
    }
  })
})

export default userType
