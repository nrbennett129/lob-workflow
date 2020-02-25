import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import UserType from './User'
import User from '../../models/User'

const dealType = new GraphQLObjectType({
  name: 'Deal',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'A unquie identifier for the deal.'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the Issuer of the deal.'
    },
    client: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The Collateral Manager or Portfolio Manager of the deal.'
    },
    closingDate: {
      type: GraphQLDateTime,
      description: 'The closing date of the deal.'
    },
    reportingDate: {
      type: GraphQLDateTime,
      description: 'The next reporting date.'
    },
    csm: {
      type: UserType,
      description: 'The Client Service Manager of the deal.',
      resolve: (_source) => {
        return User.findById(_source.csmId)
      }
    },
    acsm: {
      type: UserType,
      description: 'The Assistant Client Service Manager of the deal.',
      resolve: (_source) => {
        return User.findById(_source.acsmId)
      }
    },
    onboarder: {
      type: UserType,
      description: 'The Onboarding analyst of the deal.',
      resolve: (_source) => {
        return User.findById(_source.onId)
      }
    },
    popModeler: {
      type: UserType,
      description: 'The Waterfall analyst for the deal.',
      resolve: (_source) => {
        return User.findById(_source.waterId)
      }
    },
    compModeler: {
      type: UserType,
      description: 'The Compliance analyst for the deal.',
      resolve: (_source) => {
        return User.findById(_source.compId)
      }
    },
    compQcAnalyst: {
      type: UserType,
      description: 'The Compliance quality control analyst for the deal.',
      resolve: (_source) => {
        return User.findById(_source.compQcId)
      }
    },
    popQcAnalyst: {
      type: UserType,
      description: 'The Waterfall quality control analyst for the deal.',
      resolve: (_source) => {
        return User.findById(_source.waterQcId)
      }
    },
    maintAnalysts: {
      type: new GraphQLList(UserType),
      description: 'A list of the Maintenance analysts associated with the deal.',
      resolve: (_source) => {
        return User.find({ _id: { $in: _source.maintIds } })
      }
    }
  })
})

export default dealType
