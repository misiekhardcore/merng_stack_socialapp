import React, { useState } from "react";
import { Button, Card, Form, Popup } from "semantic-ui-react";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

export default function PostForm() {
  const [errors, setErrors] = useState({});
  const initialState = {
    body: "",
  };

  const { handleChange, handleSubmit, state } = useForm(
    () => createPost(),
    initialState
  );

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: state,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    update(proxy, { data: { createPost } }) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      //cant directly write to data.getPosts, store this in newData...
      const newData = [createPost, ...data.getPosts];

      //...and spread it in writeQuery
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { ...data, getPosts: [...newData] },
      });
      state.body = "";
      setErrors({});
    },
  });

  return (
    <Card fluid>
      <Card.Content>
        <Form
          onSubmit={handleSubmit}
          className={loading ? "loading" : ""}
        >
          <Form.Field>
            <Form.Input
              placeholder="Hello world!"
              name="body"
              onChange={handleChange}
              error={errors.general ? true : false}
              value={state.body}
            />
            <Popup
              inverted
              content="Add post"
              trigger={
                <Button type="submit" color="teal">
                  Add post
                </Button>
              }
            />
          </Form.Field>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      commentsCount
      comments {
        id
        createdAt
        username
        body
      }
      likesCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
