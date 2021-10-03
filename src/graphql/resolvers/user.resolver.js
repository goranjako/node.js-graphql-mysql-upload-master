import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { signUp, signIn } from "../../middlewere/verify";
import dotenv from "dotenv";
dotenv.config();

const resolver = {
  Query: {
    //Login
    login: async (paren, { input }, { db }) => {
      await signIn.validate(input, { abortEarly: false });
      try {
        const user = await db.User.findOne({ where: { email: input.email } });
        if (!user) {
          throw new UserInputError("User  not found");
        }
        const isEqual = await bcrypt.compareSync(input.password, user.password);
        if (!isEqual) {
          throw new UserInputError("Wrong credentials!");
        }
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
          expiresIn: 60 * 60,
        });
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    //Register

    register: async (paren, { input }, { db }) => {
      await signUp.validate(input, { abortEarly: false });
      try {
        const user = await db.User.findOne({ where: { email: input.email } });
        if (user) {
          throw new UserInputError("User already Exists");
        }
        const newUser = {
          fullName: input.fullName,
          email: input.email,
          password: input.password,
        };
        const saveduser = await db.User.create(newUser);
        const token = jwt.sign({ saveduser }, process.env.SECRET_KEY, {
          expiresIn: 60 * 60,
        });
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolver;
