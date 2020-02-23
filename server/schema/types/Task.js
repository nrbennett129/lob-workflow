const graphql = require('graphql');
const UserType = require('./User');
const DealType = require('./Deal')
const User = require('../../models/User');
const Deal = require('../../models/Deal')

const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
 } = graphql;

const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { 
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unquie identifier for the task.'
    },
    deal: { 
      type: new GraphQLNonNull(DealType), 
      description: 'The deal associated with this task.',
      resolve: (_source) => {
        return Deal.findById(_source.dealId);
      }
    },
    startDate: { 
      type: GraphQLString, 
      description: 'The date to start the task.'
    },
    dueDate: { 
      type: GraphQLString,
      description: 'The date the task is due.'
    },
    createdDate: { 
      type: GraphQLString,
      description: 'The date the task was created.'
    },
    //TODO: Think about handling situations of reopening closed tasks.
    completedDate: { 
      type: GraphQLString,
      description: 'The date the task was resolved (solved or closed).'
    },
    assignedTo: {
      type: UserType,
      description: 'The user the task is currently assigned to.',
      resolve: (_source) => {
        return User.findById(_source.assignedToId);
      }
    },
    createdBy: {
      type: UserType,
      description: 'The task\'s creator.',
      resolve: (_source) => {
        return User.findById(_source.createdById);
      }
    },
    priority: {
      type: GraphQLString,
      description: 'The priority of the task.'
    },
    subject: {
      type: GraphQLString,
      description: 'The subject of the task (e.g. New Deal Modeling, Maintenance)'
    }
    // TODO: Implement IssueType and issues endpoint
    // TODO: Implement TaskActionType and taskHistory endpoint

  })
});

module.exports = taskType;