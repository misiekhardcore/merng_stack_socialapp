import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirm, setConfirm] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = data.getPosts.filter((p) => p.id !== postId);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [...newData] },
      });

      setConfirm(false);

      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirm(true)}
        floated="right"
      >
        <Icon style={{ margin: 0 }} name="trash" />
      </Button>
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={deletePost}
      ></Confirm>
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
