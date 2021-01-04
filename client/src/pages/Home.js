import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
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
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
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

export default Home;
