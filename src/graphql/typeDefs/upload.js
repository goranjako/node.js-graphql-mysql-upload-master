import { ApolloServer, gql } from "apollo-server-express";


const upload = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    url: String!
    categories: String!
  }

  type Query {
    # This is only here to satisfy the requirement that at least one
    # field be present within the 'Query' type.  This example does not
    # demonstrate how to fetch uploads back.
   uploads:[File!]
  }
  input uploadInput {
    image: Upload!
    categories: String!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(input: uploadInput!): File!
  }
`;
export default  upload;