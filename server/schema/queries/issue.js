import { GraphQLID, GraphQLNonNull } from 'graphql'
import IssueType from '../types/Issue'
import Job from '../../models/Job'

const issueQuery = {
  type: IssueType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the issue.'
    }
  },
  resolve: (obj, { id }) => {
    return Job.findById(id)
  }
}

export default issueQuery
