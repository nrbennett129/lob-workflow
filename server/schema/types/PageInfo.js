import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql'
import CursorType from './Cursor'

const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Information for paging.',
  fields: () => ({
    // TODO: Add description
    startCursor: {
      type: CursorType,
      description: 'When paging backwards, the cursor to continue.'
    },
    endCursor: {
      type: CursorType,
      description: 'When paging forwards, the cursor to continue.'
    },
    hasNextPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paging forwards, is there a next page?'
    },
    hasPreviousPage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'When paging backwards, is there a next page?'
    }
  })
})

export default PageInfoType
