import { GraphQLObjectType } from 'graphql'
import userQuery from '../queries/user'
import usersQuery from '../queries/users'
import dealQuery from '../queries/deal'
import dealsQuery from '../queries/deals'
import taskQuery from '../queries/task'

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

export default QueryType
