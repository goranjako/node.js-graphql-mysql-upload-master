import compression from "compression";
import express from "express";
import helmet from "helmet";
import xssClean from "xss-clean";
import cors from "cors";
import hpp from "hpp";
import path from "path";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewere/errorHandler";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./graphql/shemas";
import resolvers from "./graphql/resolvers";
const app = express();
dotenv.config();

// enable cors
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Set security headers
app.use(xssClean()); // Prevent xss attacks
app.use(hpp()); // Prevent http param polution
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuates
  max: 100, // 100 requests
});
app.use(limiter);

// Catch all route
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not a valid route",
  });
});
// error handler
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // This middleware should be added before calling `applyMiddleware`.

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
