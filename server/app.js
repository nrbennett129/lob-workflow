const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const mongoose = require('mongoose')

const { PORT, MONGODB_URI } = require('./config/config')
const schema = require('./schema/schema')

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
const port = PORT || 4000
app.listen(port, () => {
  console.log(`Now listening for requests on port ${port}`)
})
