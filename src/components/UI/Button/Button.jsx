/* eslint-disable react/button-has-type */
import React from 'react';
import * as PropTypes from 'prop-types';

import classes from './Button.module.css';

function Button({
  type, className, onClick, disabled, children,
}) {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  className: '',
  onClick: () => {},
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default Button;
