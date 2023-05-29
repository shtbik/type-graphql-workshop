import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// Hardcoded data store
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

// Schema definition
const typeDefs = `#graphql
  type Book {
    title: String
    auth1or: String
  }

  type Query {
    books: [Book]
  }
`

// Resolver map
const resolvers = {
  Query: {
    books() {
      return books
    },
  },
}

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

async function bootstrap() {
  // Launch the server
  const { url } = await startStandaloneServer(server)

  console.log(`&#x1f680; Server listening at: ${url}`)
}

bootstrap()
