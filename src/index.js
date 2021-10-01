import express from 'express';
import compression from "compression";
import helmet from "helmet";
import xssClean from "xss-clean";
import cors from "cors";
import hpp from "hpp";
import path from "path";
import rateLimit from "express-rate-limit";
import { ApolloServer, gql } from "apollo-server-express";
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import morgan from "morgan";
import db from "../db/models/";
app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));
app.use(helmet()); // Set security headers
app.use(morgan("dev"));
app.use(xssClean()); // Prevent xss attacks
app.use(hpp()); // Prevent http param polution
app.use(compression());
app.use(cors());

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req) => ({ req, db}),
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer()
