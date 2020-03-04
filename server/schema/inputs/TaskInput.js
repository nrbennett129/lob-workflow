import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

const taskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  description: 'The input for a new task.',
  fields: () => ({
    editedDate: {
      type: GraphQLDateTime,
      description: 'The last time this item was edited.'
    },
    startDate: {
      type: GraphQLDateTime,
      description: 'The date to start the task.'
    },
    dueDate: {
      type: GraphQLDateTime,
      description: 'The date the task is due.'
    },
    // TODO: Think about handling situations of reopening closed tasks.
    completedDate: {
      type: GraphQLDateTime,
      description: 'The date the task was resolved (solved or closed).'
    },
    assigneeId: {
      type: GraphQLID,
      description: 'The id of the user the task is currently assigned to.'
    },
    creatorId: {
      type: GraphQLID,
      description: 'The id of the task\'s creator.'
    },
    reviewable: {
      type: GraphQLBoolean,
      description: 'True if the task is to be reviewed.'
    },
    reviewerId: {
      type: GraphQLID,
      description: 'The id of the User assigned to review the task.'
    },
    // FIX: Make this a Priority Enum type
    priority: {
      type: GraphQLInt,
      description: 'The priority of the task.'
    },
    subject: {
      type: GraphQLString,
      description: 'The subject of the task (e.g. New Deal Modeling, Maintenance)'
    },
    description: {
      type: GraphQLString,
      description: 'The description of the task.'
    }
  })
})

export default taskInput
