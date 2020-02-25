const graphql = require('graphql')
const DealType = require('../types/Deal')
const Deal = require('../../models/Deal')

const {
  GraphQLNonNull,
  GraphQLString
} = graphql

const dealMutation = {
  type: DealType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    client: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_source, args) => {
    // code to get data from db or other source
    const deal = new Deal({
      name: args.name,
      client: args.client
    })
    return deal.save()
  }
}

module.exports = dealMutation
