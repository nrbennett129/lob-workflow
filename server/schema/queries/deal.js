const graphql = require('graphql');
const DealType = require('../types/Deal');
const Deal = require('../../models/Deal');

const { GraphQLID, GraphQLNonNull } = graphql;

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
    return Deal.findById(id);
  }
}

module.exports = dealQuery