import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  useEffect(
    () => {
      // as we don't wanna check form validity on EVERY keystroke we can make a simple debounce with the help of setTimeout function:
      const timer = setTimeout(() => {
        setFormIsValid(
          enteredPassword.trim().length > 6 && enteredEmail.includes("@")
        );
      }, 500);

      // this is a cleanup function which is executed BEFORE:
      // - next useEffect call (next rerender);
      // - component unmounts (removed from the DOM);
      // IMPORTANT: cleanup function IS NOT EXECUTED before FIRST useEffect call (when component mounts).
      // so basically it helps us REMOVE the timer which was set on the previous keystroke if we make a new keystroke.
      // why do we need this? because it doesn't make any sense to check form validity on the OLD input (previous keystroke)
      // and only makes sense to check it on the latest keystroke!
      return () => clearTimeout(timer);
    },
    // About adding dependencies to the dependencies array:
    // basically we need to add everything that
    // - is USED inside useEffect;
    // - and could change on render/rerender of the component/parent components (state, props)
    // So it means that NOT EVERYTHING inside useEffect should be added to dependencies array. Exceptions are:
    // - variables defined OUTSIDE component (either our own defined variables or some external APIs variables);
    // - useState setter functions (React makes sure that they are the same between renders);
    [enteredEmail, enteredPassword]
  );

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
