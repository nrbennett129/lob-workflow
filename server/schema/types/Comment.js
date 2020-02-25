const graphql = require('graphql')
const graphqlDate = require('graphql-iso-date')
const UserType = require('./User')
const User = require('../../models/User')

const { GraphQLDateTime } = graphqlDate
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The unique id of the comment.'
    },
    author: {
      type: UserType,
      description: 'The author of the comment.',
      resolve: (_source) => {
        return User.findById(_source.authorId)
      }
    },
    posted: {
      type: GraphQLDateTime,
      description: 'The date the comment was posted.'
    },
    text: {
      type: GraphQLString,
      description: 'The text of the comment.'
    }
  })
})

module.exports = commentType
