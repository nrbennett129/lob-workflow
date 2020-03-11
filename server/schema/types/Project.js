// TODO; Implement IssuesConnection type
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import NodeInterface from '../interfaces/Node'

import User from '../../models/User'
import { getAllJobs } from '../../models/Job'

import UserType from './User'
import TaskConnectionType from './TaskConnection'
import IssueConnectionType from './IssueConnection'
import CursorType from './Cursor'

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  interfaces: () => [NodeInterface],
  fields: () => ({
    // TODO: Add descriptions
    // NodeInterface fields
    id: { type: GraphQLNonNull(GraphQLID) },
    createdDate: {
      type: GraphQLDateTime,
      resolve: (obj) => {
        return obj.created
      }
    },
    editedDate: {
      type: GraphQLDateTime,
      resolve: (obj) => {
        return obj.edited
      }
    },
    // ProjectType fields
    name: { type: GraphQLNonNull(GraphQLString) },
    // TODO: Implement some type of reference field to support a related (Deal)type
    createdBy: {
      type: UserType,
      resolve: (obj) => {
        return User.findById(obj.createdById)
      }
    },
    editedBy: {
      type: UserType,
      resolve: (obj) => {
        return User.findById(obj.editedById)
      }
    },
    tasks: {
      type: TaskConnectionType,
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'task',
          projectId: obj.id
        }
        const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
        return {
          data,
          pageInfo
        }
      }
    },
    issues: {
      type: IssueConnectionType,
      args: {
        first: { type: GraphQLInt },
        last: { type: GraphQLInt },
        after: { type: CursorType },
        before: { type: CursorType }
      },
      resolve: async (obj, { first, last, after, before }) => {
        const filterOpts = {
          type: 'issue',
          projectId: obj.id
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

export default ProjectType
