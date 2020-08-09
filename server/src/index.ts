import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolver";
import { RoomResolver } from "./resolvers/RoomResolver";
import { BookingResolver } from "./resolvers/BookingResolver";


const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      RoomResolver,
      BookingResolver
    ],
  });

  const server = new ApolloServer({ schema });

  await createConnection();

  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server started at http://localhost:4000/graphql`),
  );
};

main();
