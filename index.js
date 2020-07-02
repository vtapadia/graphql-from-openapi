const express = require('express')
const graphqlHTTP = require('express-graphql')
const { createGraphQLSchema } = require('openapi-to-graphql')
 
async function main(oas) {
    console.log("Hello")
  // generate schema:
  const { schema, report } = await createGraphQLSchema(oas)
  console.log("Hello2")
 
  // server schema:
  const app = express()
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
  app.listen(3001)
}

const oas = ["http://localhost:3000/openapi.json"]

main(oas).catch(e => {
    console.log("app failed", e)
})