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
      resolve: (_source) => {
        return User.findById(_source.createdById)
      }
    },
    editedBy: {
      type: UserType,
      resolve: (_source) => {
        return User.findById(_source.editedById)
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
        const { data, pageInfo } = await getAllJobs('projectId', 'task', obj, { first, last, after, before })
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
        const { data, pageInfo } = await getAllJobs('projectId', 'issue', obj, { first, last, after, before })
        return {
          data,
          pageInfo
        }
      }
    }
  })
})

export default ProjectType
