import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirm, setConfirm] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostorComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const newData = data.getPosts.filter((p) => p.id !== postId);

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: [...newData] },
        });
      }

      setConfirm(false);

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <Popup
      inverted
        content={`Delete ${commentId ? "comment" : "post"}`}
        trigger={
          <Button
            as="div"
            color="red"
            onClick={() => setConfirm(true)}
            floated="right"
          >
            <Icon style={{ margin: 0 }} name="trash" />
          </Button>
        }
      />

      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={deletePostorComment}
      ></Confirm>
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;

export default DeleteButton;
