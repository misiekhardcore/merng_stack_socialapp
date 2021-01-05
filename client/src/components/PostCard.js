import React, { useContext } from "react";
import moment from "moment";
import { Card, Image, Label, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({
  post: {
    id,
    body,
    username,
    createdAt,
    likes,
    comments,
    likesCount,
    commentsCount,
  },
}) => {
  const { user } = useContext(AuthContext);

  const handleComment = () => {
    console.log("post");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ likesCount, likes, id }} />
        <Button as="div" labelPosition="right" onClick={handleComment}>
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button as="div" color="red" onClick={handleDelete} floated="right">
            <Icon style={{ margin: 0 }} name="trash" />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
