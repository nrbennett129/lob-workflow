import {
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import NodeInterface from './Node'

import UserType from '../types/User'
import ProjectType from '../types/Project'

import User from '../../models/User'
import Project from '../../models/Project'

const JobInterface = new GraphQLInterfaceType({
  name: 'Job',
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unquie identifier for the task.'
    },
    createdDate: {
      type: GraphQLDateTime,
      description: 'The date the task was created.'
    },
    editedDate: {
      type: GraphQLDateTime,
      description: 'The date the task was created.'
    },
    project: {
      type: ProjectType,
      description: 'The project associated with this task.',
      resolve: (obj) => {
        return Project.findById(obj.projectId)
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
    // TODO: Think about handling situations of reopening closed tasks.
    completedDate: {
      type: GraphQLDateTime,
      description: 'The date the task was resolved (solved or closed).'
    },
    assignee: {
      type: UserType,
      description: 'The user the task is currently assigned to.',
      resolve: (obj) => {
        return User.findById(obj.assigneeId)
      }
    },
    creator: {
      type: UserType,
      description: 'The task\'s creator.',
      resolve: (obj) => {
        return User.findById(obj.creatorId)
      }
    },
    reviewer: {
      type: UserType,
      description: 'The User in charge of reviewing this task.',
      resolve: (obj) => {
        return User.findById(obj.reviewerId)
      }
    },
    reviewable: {
      type: GraphQLBoolean,
      description: 'True if the task is meant to be reviewed by another User.'
    },
    priority: {
      type: GraphQLInt,
      description: 'The priority of the task.'
    },
    subject: {
      type: GraphQLString,
      description: 'The subject of the task (e.g. New Deal Modeling, Maintenance)'
    },
    description: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'One word descriptors for the task.'
    }
    // TODO: Implement TaskActionType and taskHistory endpoint

  })
})

export default JobInterface
