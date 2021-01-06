import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";

import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
  Popup,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();

  const commentIntputRef = useRef(null);

  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState("");

  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  const [commentPost] = useMutation(COMMENT_POST, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setComment("");
      commentIntputRef.current.blur();
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
              <Popup
              inverted
                content={`${openComments ? "Close" : "Open"} comments`}
                trigger={
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => setOpenComments(!openComments)}
                  >
                    <Button basic={!openComments} color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentsCount}
                    </Label>
                  </Button>
                }
              />

              {user && user.username === username && (
                <DeleteButton postId={id} callback={handleDelete} />
              )}
            </Card.Content>
          </Card>
          <div style={{ display: openComments ? "block" : "none" }}>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        name="comment"
                        placeholder="Write a comment..."
                        value={comment || ""}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentIntputRef}
                      />
                      <Popup
                      inverted
                        content="Add comment"
                        trigger={
                          <button
                            type="submit"
                            className="ui button teal"
                            disabled={comment.trim() === ""}
                            onClick={commentPost}
                          >
                            <Icon name="add" />
                          </button>
                        }
                      />
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.length > 0 &&
              comments.map((comment) => {
                const { id, body, username, createdAt } = comment;
                return (
                  <Card fluid key={id}>
                    <Card.Content>
                      {user && user.username === username && (
                        <DeleteButton postId={postId} commentId={id} />
                      )}
                      <Card.Header>{username}</Card.Header>
                      <Card.Meta>
                        {moment(createdAt).fromNow()}
                      </Card.Meta>
                      <Card.Description>{body}</Card.Description>
                    </Card.Content>
                  </Card>
                );
              })}
          </div>
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
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
      likesCount
      commentsCount
      createdAt
    }
  }
`;

const COMMENT_POST = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
      }
      commentsCount
    }
  }
`;

export default SinglePost;
