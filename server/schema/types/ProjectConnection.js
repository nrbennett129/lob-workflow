import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'
import PageInfoType from './PageInfo'
import ProjectEdgeType from './ProjectEdge'

const ProjectConnectionType = new GraphQLObjectType({
  name: 'ProjectConnection',
  fields: () => ({
    data: { type: GraphQLList(ProjectEdgeType) },
    pageInfo: {
      type: PageInfoType,
      resolve: (obj) => {
        return {
          startCursor: obj.data[0].id || null,
          endCursor: obj.data[obj.data.length - 1].id || null,
          hasNextPage: obj.pageInfo.hasNextPage,
          hasPreviousPage: obj.pageInfo.hasPreviousPage
        }
      }
    }
  })
})

export default ProjectConnectionType
