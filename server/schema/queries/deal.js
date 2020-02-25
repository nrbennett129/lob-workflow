import { GraphQLID, GraphQLNonNull } from 'graphql'
import DealType from '../types/Deal'
import Deal from '../../models/Deal'

const dealQuery = {
  type: DealType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the deal.'
    }
  },
  resolve: (_source, { id }) => {
    // code to get data from db or other source
    return Deal.findById(id)
  }
}

export default dealQuery
