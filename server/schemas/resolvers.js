const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id}).select("-__v -password");
        return userData;
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const updateUserBooks = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { savedBooks: book} },
        {
          new: true,
          runValidators: true,
        },
      )
      return updateUserBooks;
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId: bookId} } },
          { new: true },
        )
        return user;
      }
    }
  },
};

module.exports = resolvers;
