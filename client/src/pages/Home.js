import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { getPosts: posts } = data;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading...</h1>
        ) : posts ? (
          posts.map((post) => (
            <Grid.Column
              key={post.id}
              style={{ marginBottom: "1.5rem" }}
            >
              <PostCard post={post} />
            </Grid.Column>
          ))
        ) : null}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      commentsCount
      likes {
        id
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
