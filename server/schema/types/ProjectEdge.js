import {
  GraphQLObjectType
} from 'graphql'
import ProjectType from './Project'
import CursorType from './Cursor'

const ProjectEdgeType = new GraphQLObjectType({
  name: 'ProjectEdge',
  fields: () => ({
    project: {
      type: ProjectType,
      resolve: (obj) => {
        return obj
      }
    },
    cursor: {
      type: CursorType,
      resolve: (obj) => {
        return obj.id.toString()
      }
    }
  })
})

export default ProjectEdgeType
