import uploadResolver from'./upload.resolver';
import userResolver from './user.resolver'
module.exports = {
  // modifier - the name of the type, and each time ANY mutation or subscription that returns a post, it will go through this modifier and apply these modifications
 
  Query: {
    ...uploadResolver.Query,
    ...userResolver.Query

  },
  Mutation: {
    ...uploadResolver.Mutation,
    ...userResolver.Mutation
   
  }
 
};