import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import UserType from './User'
import DealType from './Deal'
import IssueType from './Issue'
import User from '../../models/User'
import Issue from '../../models/Issue'
import Deal from '../../models/Deal'

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
        return Deal.findById(_source.dealId)
      }
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
    assignedTo: {
      type: UserType,
      description: 'The user the task is currently assigned to.',
      resolve: (_source) => {
        return User.findById(_source.assignedToId)
      }
    },
    createdBy: {
      type: UserType,
      description: 'The task\'s creator.',
      resolve: (_source) => {
        return User.findById(_source.createdById)
      }
    },
    priority: {
      type: GraphQLString,
      description: 'The priority of the task.'
    },
    subject: {
      type: GraphQLString,
      description: 'The subject of the task (e.g. New Deal Modeling, Maintenance)'
    },
    issues: {
      type: GraphQLList(IssueType),
      description: 'The issues associated with this task.',
      resolve: (_source) => {
        return Issue.find({ taskId: _source.id })
      }
    }
    // TODO: Implement TaskActionType and taskHistory endpoint

  })
})

export default taskType
