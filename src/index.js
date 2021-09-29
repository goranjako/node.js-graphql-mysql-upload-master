import express from 'express';
import compression from "compression";
import helmet from "helmet";
import xssClean from "xss-clean";
import cors from "cors";
import hpp from "hpp";
import path from "path";
import rateLimit from "express-rate-limit";
import { ApolloServer, gql } from "apollo-server-express";
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
import typeDefs from './graphql/shemas';
import resolvers from './graphql/resolvers';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import morgan from "morgan";
import db from "../db/models/";
app.use('/public', express.static(path.join(__dirname, '../public/')));
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
    context: (req) => ({ req,db}),
  });
  await server.start();


  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
