const { GraphQLList } = require('graphql');
const UserType = require('../types/User');
const User = require('../../models/User')

const usersQuery = {
  type: GraphQLList(UserType),
  description: 'Returns all the Users',
  resolve: () => {
    // code to get data from db or other source
    return User.find({})
  }
}

module.exports = usersQuery;