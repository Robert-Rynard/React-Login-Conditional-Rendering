import React, { useContext, useReducer, useRef } from "react";

import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const Login = (props) => {
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // REDUCER FUNCTION
  const formReducer = (state, action) => {
    if (action.type === "email") {
      return {
        ...state,
        email: action.val,
        isEmailValid: action.val.includes("@"),
      };
    }
    if (action.type === "password") {
      return {
        ...state,
        password: action.val,
        isPasswordValid: action.val.trim().length > 6,
      };
    }
  };

  // USEREDUCER CALL
  const [formState, dispatchForm] = useReducer(formReducer, {
    email: "",
    password: "",
    isEmailValid: undefined,
    isPasswordValid: undefined,
  });

  // UPDATES REDUCER WHEN INPUT CHANGES
  const formChangeHandler = (event) => {
    dispatchForm({ type: event.target.id, val: event.target.value });
  };

  // SUBMITS THE FORM WITH FUNCTION FROM PARENT
  const submitHandler = (event) => {
    event.preventDefault();
    if (formState.isEmailValid && formState.isPasswordValid) {
      authCtx.onLogin(formState.email, formState.password);
    } else if (!formState.isEmailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          valid={formState.isEmailValid}
          type="email"
          id="email"
          value={formState.email}
          onChange={formChangeHandler}
          label="E-Mail"
        />
        <Input
          ref={passwordInputRef}
          valid={formState.isPasswordValid}
          type="password"
          id="password"
          value={formState.password}
          onChange={formChangeHandler}
          label="Password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
