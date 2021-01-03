import React from "react";
import moment from "moment";
import { Card, Image, Label, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { id, body, username, createdAt, likesCount, commentsCount },
}) => {
  const handleLike = () => {
    console.log("like");
  };

  const handleComment = () => {
    console.log("post");
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
        <Button as="div" labelPosition="right" onClick={handleLike}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={handleComment}>
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
