const graphql = require('graphql');
const TaskType = require('../types/Task');
const Task = require('../../models/Task');

const { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
 } = graphql;

const taskMutation= {
  type: TaskType,
  args: {
    dealId: {type: new GraphQLNonNull(GraphQLID)},
    // TODO: Implement a GraphQL Input type for adding a Task
  },
  resolve: (_source, args) => {
    // code to get data from db or other source
    let task = new Task({
      dealId: args.dealId
    })
    return task.save();
  }
}

module.exports = taskMutation
