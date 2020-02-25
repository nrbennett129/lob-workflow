import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import UserType from './User'
import User from '../../models/User'

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

export default commentType
