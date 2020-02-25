import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql'
import IssueType from '../types/Issue'
import Issue from '../../models/Issue'

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

export default issueMutation
