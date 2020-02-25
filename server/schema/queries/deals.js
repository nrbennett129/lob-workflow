import { GraphQLInt, GraphQLList } from 'graphql'
import DealType from '../types/Deal'
import Deal from '../../models/Deal'

const dealsQuery = {
  type: GraphQLList(DealType),
  args: {
    num: {
      type: GraphQLInt,
      description: 'The number of deals to return. If left blank, the query will return all deals.'
    }
  },
  resolve: (_source, { num }) => {
    // code to get data from db or other source
    if (!num) {
      return Deal.find({})
    } else {
      return Deal.find().limit(num)
    }
  }
}

export default dealsQuery
