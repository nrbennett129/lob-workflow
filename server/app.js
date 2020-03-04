import express from 'express'
import graphqlHTTP from 'express-graphql'
import { printSchema } from 'graphql'
import cors from 'cors'
import mongoose from 'mongoose'

import { PORT, MONGODB_URI } from './config/config'
import { schema } from './schema/schema'

const app = express()

// allow cross-origin requests
app.use(cors())

// connect to the MongoDB database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to database')
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.use('/gqlSchema', (req, res) => {
  const schemaString = printSchema(schema, true)
  res.send(schemaString)
})
const port = PORT || 4000
app.listen(port, () => {
  console.log(`Now listening for requests on port ${port}`)
})
