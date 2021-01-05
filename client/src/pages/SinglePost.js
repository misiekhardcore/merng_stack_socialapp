import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";

import {
  Button,
  Card,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();

  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleDelete = () => {
    props.history.push("/");
  };

  const { getPost: post } = data;
  const {
    id,
    username,
    likesCount,
    likes,
    commentsCount,
    comments,
    body,
    createdAt,
  } = post;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            size="small"
            floated="right"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton
                user={user}
                post={{ id, likes, likesCount }}
              />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment on post")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentsCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={handleDelete} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      likes {
        id
        username
      }
      comments {
        id
        body
      }
      likesCount
      commentsCount
      createdAt
    }
  }
`;

export default SinglePost;
