const graphql = require('graphql');
const UserType = require('../types/User');
const User = require('../../models/User');

const { GraphQLID, GraphQLNonNull } = graphql;

const userQuery = {
  type: UserType,
  args: {
    id: { 
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the user.'
    }
  },
  resolve: (_source, { id }) => {
    // code to get data from db or other source
    return User.findById(id);
  }
}

module.exports = userQuery