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
  resolve: (_source, args) => {
    // code to get data from db or other source
    const comment = new Comment({
      issueId: args.issueId,
      authorId: args.authorId,
      text: args.text
    })
    return comment.save()
  }
}

export default commentMutation
