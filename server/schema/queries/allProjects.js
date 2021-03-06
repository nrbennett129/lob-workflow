import { GraphQLInt } from 'graphql'
import { getAllProjects } from '../../models/Project'
import ProjectConnectionType from '../types/ProjectConnection'
import CursorType from '../types/Cursor'

const allProjectsQuery = {
  type: ProjectConnectionType,
  args: {
    first: { type: GraphQLInt },
    last: { type: GraphQLInt },
    after: { type: CursorType },
    before: { type: CursorType }
  },
  resolve: async (obj, { first, last, after, before }) => {
    const { data, pageInfo } = await getAllProjects(obj, { first, last, after, before })
    return {
      data,
      pageInfo
    }
  }
}

export default allProjectsQuery
