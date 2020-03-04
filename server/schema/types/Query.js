import { GraphQLObjectType } from 'graphql'
import projectQuery from '../queries/project'
import taskQuery from '../queries/task'
import usersQuery from '../queries/users'
import allProjectsQuery from '../queries/allProjects'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    project: projectQuery,
    allProjects: allProjectsQuery,
    task: taskQuery,
    users: usersQuery
  }
})

export default QueryType
