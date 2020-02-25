import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import DealType from '../types/Deal'
import DealInput from '../inputs/DealInput'
import Deal from '../../models/Deal'

const dealMutation = {
  type: DealType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    client: { type: new GraphQLNonNull(GraphQLString) },
    input: { type: DealInput }
  },
  resolve: (_source, { name, client }) => {
    const deal = new Deal({
      name: name,
      client: client
    })
    return deal.save()
  }
}

export default dealMutation
