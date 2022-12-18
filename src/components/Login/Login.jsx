/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

function Login() {
  const ctx = useContext(AuthContext);
  // we comment it out just for the sake of useReducer approach
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  // 'useReducer' hook is good when want to update some part of the state
  // depending on some other part of the state update
  // (e.g. we want to update 'emailIsValid' part after we update 'enteredEmail' part of the state).
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'UPDATE_ENTERED_EMAIL': {
          const updatedState = {
            ...prevState,
            enteredEmail: action.payload,
            emailIsValid: action.payload.includes('@'),
          };

          const formIsValid = updatedState.emailIsValid && updatedState.passwordIsValid;

          return {
            ...updatedState,
            formIsValid,
          };
        }
        case 'EMAIL_INPUT_BLUR': {
          return {
            ...prevState,
            emailIsValid: prevState.enteredEmail.includes('@'),
          };
        }
        case 'UPDATE_ENTERED_PASSWORD': {
          const updatedState = {
            ...prevState,
            enteredPassword: action.payload,
            passwordIsValid: action.payload.trim().length > 6,
          };

          const formIsValid = updatedState.emailIsValid && updatedState.passwordIsValid;

          return {
            ...updatedState,
            formIsValid,
          };
        }
        case 'PASSWORD_INPUT_BLUR': {
          return {
            ...prevState,
            passwordIsValid: prevState.enteredPassword.trim().length > 6,
          };
        }
        default:
          return prevState;
      }
    },
    {
      enteredEmail: '',
      emailIsValid: '',
      enteredPassword: '',
      passwordIsValid: '',
      formIsValid: '',
    },
  );

  const emailChangeHandler = (event) => {
    // as we use useReducer we now don't have direct setters available
    // setEnteredEmail(event.target.value);

    // instead, we just dispatch actions
    dispatch({
      type: 'UPDATE_ENTERED_EMAIL',
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatch({
      type: 'UPDATE_ENTERED_PASSWORD',
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    // if we look closer, then we can see that this code violates React rules:
    // we are referencing 'enteredEmail' state slice
    // which we cannot be sure about if it holds the latest value!
    // we could use another form of 'setEmailIsValid' setter
    // BUT React would give us the latest value of
    // 'emailIsValid' in this case.
    // And it is not what we need (we need the latest value of 'enteredEmail').
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatch({
      type: 'EMAIL_INPUT_BLUR',
    });
  };

  const validatePasswordHandler = () => {
    // this is also invalid!
    // if our next state slice value depends on previous vaLue OF THE SAME SLICE
    // then it's OK (but not in this case because
    // 'enteredPassword' and 'passwordIsValid' are TWO DIFFERENT SLICES OF STATE!
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatch({
      type: 'PASSWORD_INPUT_BLUR',
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(state.enteredEmail, state.enteredPassword);
  };

  // we comment out useEffect because we are using useReducer for the same state updates
  // useEffect(
  //   () => {
  //     // as we don't wanna check form validity on EVERY keystroke
  //     // we can make a simple debounce with the help of setTimeout function:
  //     const timer = setTimeout(() => {
  //       setFormIsValid(
  //         enteredPassword.trim().length > 6 && enteredEmail.includes('@'),
  //       );
  //     }, 500);
  //
  //     // this is a cleanup function which is executed BEFORE:
  //     // - next useEffect call (next rerender);
  //     // - component unmounts (removed from the DOM);
  //     // IMPORTANT: cleanup function IS NOT EXECUTED
  //     // before FIRST useEffect call (when component mounts).
  //     // COMPONENT MOUNTS:
  //     // 1) main useEffect function INVOKED
  //     // COMPONENT RE-RENDERS:
  //     // 1) cleanup function INVOKED
  //     // 2) main useEffect function INVOKED
  //     // COMPONENT UNMOUNTS:
  //     // 1) cleanup function INVOKED
  //     return () => clearTimeout(timer);
  //     // so basically it helps us REMOVE the timer which was set on the previous keystroke
  //     // if we make a new keystroke.
  //     // why do we need this? because it doesn't make any sense
  //     // to check form validity on the OLD input (previous keystroke)
  //     // and only makes sense to check it on the latest keystroke!
  //   },
  //   // About adding dependencies to the dependencies array:
  //   // basically we need to add everything that
  //   // - is USED inside useEffect;
  //   // - and could change on render/rerender of the component/parent components (state, props)
  //   // So it means that NOT EVERYTHING inside useEffect should be added to dependencies array.
  //   // Exceptions are:
  //   // - variables defined OUTSIDE component (either our own defined variables
  //   // or some external APIs variables);
  //   // - useState setter functions (React makes sure that they are the same between renders);
  //   [enteredEmail, enteredPassword],
  // );

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
