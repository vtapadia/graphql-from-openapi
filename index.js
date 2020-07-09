const express = require('express')
const graphqlHTTP = require('express-graphql')
const { createGraphQLSchema } = require('openapi-to-graphql')
const request = require('request');

async function main(oas) {
  // retrieve schema:
  request(oas, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      createServer(JSON.parse(body))
    } else {
      console.log("Request failed", error, response);
    }
  });
  
}

async function createServer(oas) {
  const { schema, report } = await createGraphQLSchema(oas)

  const app = express()
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
  app.listen(3000)
  console.log("Server started on port 3000")
}

const oas = "http://localhost:3001/openapi.json"

main(oas).catch(e => {
    console.log("app failed", e)
})