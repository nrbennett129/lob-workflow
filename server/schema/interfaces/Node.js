import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    // TODO: Add description
    id: { type: GraphQLNonNull(GraphQLID) },
    createdDate: { type: GraphQLDateTime },
    editedDate: { type: GraphQLDateTime }
  })
})

export default NodeInterface
