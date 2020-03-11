import { GraphQLObjectType } from 'graphql'
import projectQuery from '../queries/project'
import issueQuery from '../queries/issue'
import taskQuery from '../queries/task'
import userQuery from '../queries/user'
import allProjectsQuery from '../queries/allProjects'
import allIssuesQuery from '../queries/allIssues'
import allTasksQuery from '../queries/allTasks'
import allUsersQuery from '../queries/allUsers'

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    project: projectQuery,
    allProjects: allProjectsQuery,

    issue: issueQuery,
    allIssues: allIssuesQuery,

    task: taskQuery,
    allTasks: allTasksQuery,

    user: userQuery,
    allUsers: allUsersQuery
  }
})

export default QueryType
