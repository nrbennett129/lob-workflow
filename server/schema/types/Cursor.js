import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export function toCursor (string) {
  return Buffer.from(string, 'utf8').toString('base64')
}

export function fromCursor (string) {
  const value = Buffer.from(string, 'base64').toString('utf8')
  return value || null
}

const CursorType = new GraphQLScalarType({
  name: 'Cursor',
  serialize (value) {
    return toCursor(value) || null
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return fromCursor(ast.value)
    } else {
      return null
    }
  },
  parseValue (value) {
    return fromCursor(value)
  }
})

export default CursorType
