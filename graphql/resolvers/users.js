const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { JWT_SECRET } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, {  username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Validation error", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const matchPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!matchPassword) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { username, email, password, confirmPassoword }) {
      //Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassoword
      );

      if (!valid) {
        throw new UserInputError("Validation error", { errors });
      }

      //Make sure user doesnt already exist
      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("User is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email is taken", {
          errors: {
            username: "This email is taken",
          },
        });
      }

      //Hash pass and create aut token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
