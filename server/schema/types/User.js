import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import TaskType from './Task'
import Job from '../../models/Job'

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
    assignedTasks: {
      type: new GraphQLList(TaskType),
      description: 'Tasks currently assigned to the user.',
      resolve: (_source) => {
        return Job.find({ assignedToId: _source.id })
      }
    },
    createdTasks: {
      type: new GraphQLList(TaskType),
      description: 'Tasks currently created by the user.',
      resolve: (_source) => {
        return Job.find({ createdById: _source.id })
      }
    }
  })
})

export default userType
