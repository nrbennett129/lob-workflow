const graphql = require('graphql')
const CommentType = require('./Comment')
const Comment = require('../../models/Comment')
const Issue = require('../../models/Issue')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql

const issueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The unique id of the issue.'
    },
    title: {
      type: GraphQLString,
      description: 'A descriptor of the issue.'
    },
    status: {
      type: GraphQLString,
      description: 'The current status of the issue. One of Closed, Open, Pending Approval, or Solved.'
    },
    comments: {
      type: GraphQLList(CommentType),
      description: 'Discussion of the issue.',
      resolve: (_source) => {
        return Comment.find({ issueId: _source.id })
      }
    },
    related: {
      type: GraphQLList(issueType),
      description: 'Related issues.',
      resolve: (_source) => {
        return Issue.find({ _id: { $in: _source.linkedIssueIds } })
      }
    },
    tags: {
      type: GraphQLList(GraphQLString)
    }
  })
})

module.exports = issueType
