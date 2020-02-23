const { GraphQLSchema } = require('graphql');

const QueryType = require('./types/Query');
const MutationType = require('./types/Mutation');

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})