import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import CursorType from './Cursor'
import TaskConnectionType from './TaskConnection'
import IssueConnectionType from './IssueConnection'

import { getAllJobs } from '../../models/Job'

const UserType = new GraphQLObjectType({
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
      type: TaskConnectionType,
      description: 'Tasks currently assigned to the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'task',
          assigneeId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    createdTasks: {
      type: TaskConnectionType,
      description: 'Tasks currently assigned to the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'task',
          creatorId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    reviewedTasks: {
      type: TaskConnectionType,
      description: 'Tasks currently assigned to the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'task',
          reviewerId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    assignedIssues: {
      type: IssueConnectionType,
      description: 'Issues assigned to the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'issue',
          assigneeId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    createdIssues: {
      type: IssueConnectionType,
      description: 'Issues assigned to the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'issue',
          creatorId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    reviewedIssues: {
      type: IssueConnectionType,
      description: 'Issues reviewed by the user.',
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'issue',
          reviewerId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    }
  })
})

export default UserType
