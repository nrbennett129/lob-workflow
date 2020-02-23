const graphql = require('graphql');
const addUserMutation = require('../mutations/addUser');
const addDealMutation = require('../mutations/addDeal');
const addTaskMutation = require('../mutations/addTask');


const { GraphQLObjectType } = graphql;

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: addUserMutation,
    addDeal: addDealMutation,
    addTask: addTaskMutation
  }
});

module.exports = MutationType;