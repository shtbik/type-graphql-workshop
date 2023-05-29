import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import {
  buildSchema,
  Field,
  ObjectType,
  Resolver,
  Query,
  FieldResolver,
  Root,
  type ResolverInterface,
} from 'type-graphql'

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

@ObjectType({ description: 'Object representing a book' })
class Book {
  @Field()
  title: string

  @Field()
  author: string
}

// Resolver map
@Resolver((of) => Book)
class BooksResolver implements ResolverInterface<Book> {
  @Query(() => [Book], {
    description: 'Get all the books',
  })
  async books(): Promise<Book[]> {
    return books
  }
  @FieldResolver()
  title(@Root() book: Book): string {
    return `Title: ${book.title}`
  }
}

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [BooksResolver],
    emitSchemaFile: true,
  })

  const server = new ApolloServer({
    schema,
  })

  // Launch the server
  const { url } = await startStandaloneServer(server)

  console.log(`&#x1f680; Server listening at: ${url}`)
}

bootstrap()
