const graphql = require('graphql');
const DealType = require('../types/Deal');
const Deal = require('../../models/Deal');

const { GraphQLInt, GraphQLList } = graphql;


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
    if(!num) {
      return Deal.find({});
    } else {
      return Deal.find().limit(num)
    }
  }
}

module.exports = dealsQuery