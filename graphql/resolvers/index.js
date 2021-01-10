const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const { merge } = require("lodash");

//using lodash to merge resolvers together
module.exports = merge(postsResolvers, usersResolvers, commentsResolvers);
