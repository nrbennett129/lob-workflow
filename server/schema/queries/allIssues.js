import IssueConnectionType from '../types/IssueConnection'
import { getAllJobs } from '../../models/Job'
import { GraphQLInt } from 'graphql'
import CursorType from '../types/Cursor'

const allIssuesQuery = {
  type: IssueConnectionType,
  args: {
    first: { type: GraphQLInt },
    last: { type: GraphQLInt },
    after: { type: CursorType },
    before: { type: CursorType }
  },
  resolve: async (obj, { first, last, after, before }) => {
    const filterOpts = { type: 'issue' }
    const { data, pageInfo } = await getAllJobs(obj, { first, last, after, before }, filterOpts)
    return {
      data,
      pageInfo
    }
  }
}

export default allIssuesQuery
