const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const Book = require("./resolvers/Book");
const Cart = require("./resolvers/Cart");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
  Book,
  Cart
};

const server = new GraphQLServer({
  typeDefs: __dirname + "/schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
