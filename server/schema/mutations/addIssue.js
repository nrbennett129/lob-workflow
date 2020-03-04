import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import IssueType from '../types/Issue'
import TaskInput from '../inputs/TaskInput'
import Job from '../../models/Job'

const issueMutation = {
  type: IssueType,
  args: {
    projectId: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: TaskInput }
  },
  resolve: (_source, { projectId, input }) => {
    const issue = new Job({
      projectId: projectId,
      ...input,
      type: 'issue'
    })
    return issue.save()
  }
}

export default issueMutation
