import React from 'react';
import * as PropTypes from 'prop-types';

import classes from './Card.module.css';

function Card({ className, children }) {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}

Card.defaultProps = {
  className: '',
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default Card;
