import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} from 'graphql'
import DealType from '../types/Deal'
import DealInput from '../inputs/DealInput'
import Deal from '../../models/Deal'

const updateDealMutation = {
  type: DealType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    client: { type: GraphQLString },
    input: { type: DealInput }
  },
  resolve: async (_source, { id, name, client, input }) => {
    const deal = await Deal.findById(id)
    deal.name = name || deal.name
    deal.client = client || deal.client
    for (const key in input) {
      deal[key] = input[key]
    }
    return deal.save()
  }
}

export default updateDealMutation
