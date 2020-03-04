import {
  GraphQLObjectType
} from 'graphql'
import IssueType from './Issue'
import CursorType from './Cursor'

const IssueEdgeType = new GraphQLObjectType({
  name: 'IssueEdge',
  fields: () => ({
    issue: {
      type: IssueType,
      resolve: (issueEdge) => {
        // May not need this resolver
        return issueEdge
      }
    },
    cursor: {
      type: CursorType,
      resolve: (issueEdge) => {
        return issueEdge.id.toString()
      }
    }
  })
})

export default IssueEdgeType
