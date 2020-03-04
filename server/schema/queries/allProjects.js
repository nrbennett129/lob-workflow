import { GraphQLList } from 'graphql'
import ProjectType from '../types/Project'
import Project from '../../models/Project'

const allProjectsQuery = {
  type: GraphQLList(ProjectType),
  resolve: () => {
    return Project.find({})
  }
}

export default allProjectsQuery
