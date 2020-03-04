import { GraphQLID, GraphQLNonNull } from 'graphql'
import ProjectType from '../types/Project'
import Project from '../../models/Project'

const projectQuery = {
  type: ProjectType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The id of the project.'
    }
  },
  resolve: (obj, { id }) => {
    // code to get data from db or other source
    return Project.findById(id)
  }
}

export default projectQuery
