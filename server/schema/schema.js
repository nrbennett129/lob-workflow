import { GraphQLSchema } from 'graphql'
import QueryType from './types/Query'
import MutationType from './types/Mutation'

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
