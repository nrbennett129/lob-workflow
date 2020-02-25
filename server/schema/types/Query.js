const graphql = require('graphql')
const userQuery = require('../queries/user')
const usersQuery = require('../queries/users')
const dealQuery = require('../queries/deal')
const dealsQuery = require('../queries/deals')
const taskQuery = require('../queries/task')

const { GraphQLObjectType } = graphql

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: userQuery,
    users: usersQuery,
    deal: dealQuery,
    deals: dealsQuery,
    task: taskQuery
  }
})

module.exports = QueryType