import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const LikeButton = ({ user, post: { likesCount, likes, id } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (
      user &&
      likesCount > 0 &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user, likesCount]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId: id,
    },
  });

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Button color="red" basic={liked ? false : true}>
        <Icon name="heart" />
      </Button>
      {user ? (
        <Label as="a" basic color="red" pointing="left">
          {likesCount}
        </Label>
      ) : (
        <Label as={Link} to="/login" basic color="red" pointing="left">
          {likesCount}
        </Label>
      )}
    </Button>
  );
};

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        id
        username
      }
    }
  }
`;

export default LikeButton;
