import React from 'react';
import * as PropTypes from 'prop-types';
import classes from './Input.module.css';

// to enable REFS on custom component we need to use React.forwardRef
// which makes it possible to pass a ref FROM PARENT and attach it
// TO a native DOM element inside a CHILD component,
// and then we can access this DOM element in PARENT component
// (e.g. call DOM API 'focus' method on 'input' element to focus on the input)
const Input = React.forwardRef(
  ({
    type, id, label, isValid, value, onChange, onBlur,
  }, ref) => (
    // if we don't want to expose everything what DOM element with ref attached has,
    // and we would like to fine tune it (e.g. we want only 'focus' method to be called)
    // we can use another React HOOK: useImperativeHandle
    // const inputRef = useRef();
    //
    // const focusInput = () => {
    //   inputRef.current.focus();
    // };
    //
    // // we use 'useImperativeHandle' hook to EXPOSE the object with data
    // // that we want to share with PARENT component
    // useImperativeHandle(ref, () => ({
    //   focus: focusInput,
    // }));
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  ),
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default Input;
