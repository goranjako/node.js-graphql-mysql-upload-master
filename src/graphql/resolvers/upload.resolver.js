import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';
import { UserInputError } from "apollo-server-express";
import authHeader from "../../middlewere/auth";
import { unlink } from 'fs';

const resolvers = {
    // This maps the `Upload` scalar to the implementation provided
    // by the `graphql-upload` package.
    Upload: GraphQLUpload,
    Query: {
      uploads: async (parent, args, { req, db }) => {
        await authHeader(req);
        try {
          const pictures = await db.Uploads.findAll();
          return pictures;
        } catch (error) {
          throw new UserInputError("Pictures not found");
        }
      },
      },
    Mutation: {
      singleUpload: async (parent, { input },{ req, db }) => {
        try{
        //await authHeader(req);
        const { createReadStream, filename, mimetype, encoding } = await input.image;
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
  
        const paths = `uploads/${filename}`;
          // This is purely for demonstration purposes and will overwrite the
          // local-file-output.txt in the current working directory on EACH upload.
          const out = require('fs').createWriteStream(paths);
          stream.pipe(out);
        const url ='http://localhost:4000/uploads/' + filename;
         const user = await db.Uploads.findOne({ where: { url: url } });
        if (user) {
          throw new UserInputError("Url already Exists");
        }
        const newPhoto = {
          url:url, 
          categories: input.categories
          
        };
        const pictures = await db.Uploads.create(newPhoto);
        return pictures;   
           
      }
      catch (error) {
        throw error;
      }
    },
  
  deleteImg: async (parent, { id }, { req, db }) => {
    await authHeader(req);
    try {
      const pictures = await db.Uploads.destroy({ where: { id: id } });
      return { message: "Successful Delete Picture" };
    } catch (error) {
      throw new UserInputError("Picture not found");
    }
  }
    }
}
  module.exports = resolvers