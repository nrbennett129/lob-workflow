import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

import JobInterface from '../interfaces/Job'

import UserType from './User'
import ProjectType from './Project'
import CommentConnectionType from './CommentConnection'
import CursorType from './Cursor'

import User from '../../models/User'
import Project from '../../models/Project'
import { getAllComments } from '../../models/Comment'
import Job from '../../models/Job'

const IssueType = new GraphQLObjectType({
  name: 'Issue',
  interfaces: [JobInterface],
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
    status: {
      type: GraphQLString,
      description: 'The current status of the issue. One of Closed, Open, Pending Approval, or Solved.'
    },
    comments: {
      type: CommentConnectionType,
      description: 'Discussion of the issue.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const { data, pageInfo } = await getAllComments('jobId', obj, { first, last, after, before })
        return {
          data,
          pageInfo
        }
      }
    },
    related: {
      type: GraphQLList(JobInterface),
      description: 'Related issues.',
      resolve: (_source) => {
        return Job.find({ _id: { $in: _source.relatedIds } })
      }
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'One word descriptors for the task.'
    }
    // TODO: Implement TaskActionType and taskHistory endpoint

  })
})

export default IssueType
