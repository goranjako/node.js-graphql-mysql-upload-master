const {
    GraphQLUpload,
    graphqlUploadExpress, // A Koa implementation is also exported.
  } = require('graphql-upload');
  
const resolvers = {
    // This maps the `Upload` scalar to the implementation provided
    // by the `graphql-upload` package.
    Upload: GraphQLUpload,
  
    Mutation: {
      singleUpload: async (parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
  
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
  
        const paths = `public/${filename}`;
          // This is purely for demonstration purposes and will overwrite the
          // local-file-output.txt in the current working directory on EACH upload.
          const out = require('fs').createWriteStream(paths);
          stream.pipe(out);
          
    
          const photo={ filename };
        
           
           return photo;
      },
    },
  };
  module.exports = resolvers