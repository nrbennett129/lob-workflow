const graphql = require('graphql')
const addUserMutation = require('../mutations/addUser')
const addDealMutation = require('../mutations/addDeal')
const addTaskMutation = require('../mutations/addTask')
const addIssueMutation = require('../mutations/addIssue')
const addCommentMutation = require('../mutations/addComment')

const { GraphQLObjectType } = graphql

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: addUserMutation,
    addDeal: addDealMutation,
    addTask: addTaskMutation,
    addIssue: addIssueMutation,
    addComment: addCommentMutation
  }
})

module.exports = MutationType
