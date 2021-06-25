# merng_stack_socialapp

Deployed on heroku [here](https://merng-social-app-client.herokuapp.com/)
You can log in with username `user` and password `user` but feel free to register

To use it add .env to root directory and add `PORT` with local server port number, `MONGO` with mongo string to your database and `JWTSECRET` with secret string for your JWT.
in `client/src/ApolloProvider.js` change `uri` in `httplink` to `http://localhost:YOUR_PORT_FROM_ENV`.
Now open one console in root dir and run `yarn start` and another in client and also run `yarn start`.

## Server

- add apollo
- add mongoose
- create server at port 5000 with mongodb connection
- add pubsub to handle publish subscribe acctions

## MongoDB

- add User model
- add Post model

## GraphQL

**users**

- **login** - mutation to let users log in
- **register** - mutation to register new user

**posts**

- **getPosts** - query to fetch all posts
- **getPost** - query to get one post
- **createPost** - mutation to create new post
- **deletePost** - mutation to delete post (auth check)
- **newPost** - subscription to get info when new post is created

**comments**

- **createComment** - mutation to create new comment
- **deleteComment** - mutation to delete comment

**likes**

- **likePost** - mutation to toggle post like action

## Client

- **create-react-app** - created empty template
- **semantic-ui** - for styling
- **moment** - for date formatting
