const graphql = require('graphql')
const IssueType = require('../types/Issue')
const Issue = require('../../models/Issue')

const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = graphql

const issueMutation = {
  type: IssueType,
  args: {
    taskId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_source, args) => {
    // code to get data from db or other source
    const issue = new Issue({
      taskId: args.taskId,
      title: args.title
    })
    return issue.save()
  }
}

module.exports = issueMutation
