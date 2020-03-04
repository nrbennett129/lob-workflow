import {
  GraphQLObjectType
} from 'graphql'
import CommentType from './Comment'
import CursorType from './Cursor'

const CommentEdgeType = new GraphQLObjectType({
  name: 'CommentEdge',
  fields: () => ({
    comment: {
      type: CommentType,
      resolve: (commentEdge) => {
        // May not need this resolver
        return commentEdge
      }
    },
    cursor: {
      type: CursorType,
      resolve: (commentEdge) => {
        return commentEdge.id.toString()
      }
    }
  })
})

export default CommentEdgeType
