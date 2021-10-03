import {  gql } from 'apollo-server-express';

import upload from "./upload";
import user from './user';

const base = gql`
  extend type Query {
    _: String!
  }

  extend type Mutation {
    _: String!
  }
`;
const typeDefs = [base, upload,user];
export default typeDefs;