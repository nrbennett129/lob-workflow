import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'
import CommentType from '../types/Comment'
import Comment from '../../models/Comment'

const commentMutation = {
  type: CommentType,
  args: {
    issueId: { type: new GraphQLNonNull(GraphQLID) },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_source, { issueId, authorId, text }) => {
    const comment = new Comment({
      jobId: issueId,
      authorId: authorId,
      text: text
    })
    return comment.save()
  }
}

export default commentMutation
