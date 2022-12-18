/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

function Login() {
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
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
    // now when the Button is always enabled by default
    // we need to check if inputs are valid BEFORE calling 'onLogin'
    if (state.formIsValid) {
      ctx.onLogin(state.enteredEmail, state.enteredPassword);
    } else if (!state.emailIsValid) {
      // and here we want to do something new:
      // we want to FOCUS on the input which didn't pass validation.
      // the naive approach will not work because we cannot 'give' REFS to custom components
      // BUT only to built-in DOM elements (e.g. <input> and so on). So we have to
      // attach the REF to a DOM element INSIDE CHILD component via combination of:
      // - passing a 'ref' prop;
      // - wrapping CHILD component with React.forwardRef (where we get 'ref' as a 2nd argument).
      // After doing all of this the following WILL work:
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
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
        <Input
          id="email"
          label="Email"
          type="email"
          ref={emailRef}
          value={state.enteredEmail}
          isValid={state.emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          ref={passwordRef}
          value={state.enteredPassword}
          isValid={state.passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
