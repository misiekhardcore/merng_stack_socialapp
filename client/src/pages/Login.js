import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
  };

  const { handleChange, handleSubmit, state } = useForm(
    () => logUser(),
    initialState
  );

  const [logUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]?.extensions?.exception?.errors || {});
    },
    variables: state,
  });

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          name="username"
          label="Username"
          placeholder="Username..."
          type="text"
          value={state.username}
          error={errors?.username || errors?.general ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          name="password"
          label="Password"
          placeholder="Password..."
          type="password"
          value={state.password}
          error={errors?.password || errors?.general ? true : false}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
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
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
      username
      email
      createdAt
    }
  }
`;

export default Login;
