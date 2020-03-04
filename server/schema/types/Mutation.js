import { GraphQLObjectType } from 'graphql'
import addUserMutation from '../mutations/addUser'
import addDealMutation from '../mutations/addDeal'
import updateDealMutation from '../mutations/updateDeal'
import addTaskMutation from '../mutations/addTask'
import addIssueMutation from '../mutations/addIssue'
import updateTaskMutation from '../mutations/updateTask'
import addCommentMutation from '../mutations/addComment'

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: addUserMutation,

    addDeal: addDealMutation,
    updateDeal: updateDealMutation,

    addTask: addTaskMutation,
    updateTask: updateTaskMutation,

    addIssue: addIssueMutation,

    addComment: addCommentMutation
  }
})

export default MutationType
