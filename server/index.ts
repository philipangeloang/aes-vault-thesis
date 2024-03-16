import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Context, createContext } from "./context";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const start = async () => {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: 4000 },
  });

  console.log(`\
  🚀 Server ready at: ${url}`);
};

start();
