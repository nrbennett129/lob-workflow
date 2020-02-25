const graphql = require('graphql')
const CommentType = require('../types/Comment')
const Comment = require('../../models/Comment')

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = graphql

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

module.exports = commentMutation
