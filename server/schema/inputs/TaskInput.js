const graphql = require('graphql')
const graphqlDate = require('graphql-iso-date')

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = graphql

const { GraphQLDateTime } = graphqlDate

const taskInput = new GraphQLInputObjectType({
  name: 'TaskInput',
  description: 'The input for a new task.',
  fields: () => ({
    dealId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the deal associated with this task.'
    },
    startDate: {
      type: GraphQLDateTime,
      description: 'The date to start the task.'
    },
    dueDate: {
      type: GraphQLDateTime,
      description: 'The date the task is due.'
    },
    createdDate: {
      type: GraphQLDateTime,
      description: 'The date the task was created.'
    },
    // TODO: Think about handling situations of reopening closed tasks.
    completedDate: {
      type: GraphQLDateTime,
      description: 'The date the task was resolved (solved or closed).'
    },
    assignedToId: {
      type: GraphQLID,
      description: 'The id of the user the task is currently assigned to.'
    },
    createdById: {
      type: GraphQLID,
      description: 'The id of the task\'s creator.'
    },
    priority: {
      type: GraphQLString,
      description: 'The priority of the task.'
    },
    subject: {
      type: GraphQLString,
      description: 'The subject of the task (e.g. New Deal Modeling, Maintenance)'
    }
  })
})

module.exports = taskInput
