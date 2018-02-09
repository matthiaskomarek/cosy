import React from 'react';
import PropTypes from 'prop-types';

const <%= componentName %> = (props) => {
  return (
    <div {...props}>{props.text}</div>
  )
};

<%= componentName %>.propTypes = {
  text: PropTypes.string
};

<%= componentName %>.defaultProps = {
  text: 'It works!'
};

export default <%= componentName %>;
