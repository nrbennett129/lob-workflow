import {
  GraphQLInputObjectType,
  GraphQLID
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

const dealInput = new GraphQLInputObjectType({
  name: 'DealInput',
  description: 'The input for a new deal.',
  fields: () => ({
    closingDate: { type: GraphQLDateTime },
    reportingDate: { type: GraphQLDateTime },
    csmId: { type: GraphQLID },
    acsmId: { type: GraphQLID },
    onId: { type: GraphQLID },
    waterId: { type: GraphQLID },
    compId: { type: GraphQLID },
    compQcId: { type: GraphQLID },
    waterQcId: { type: GraphQLID },
    maintIds: { type: GraphQLID }
  })
})

export default dealInput
