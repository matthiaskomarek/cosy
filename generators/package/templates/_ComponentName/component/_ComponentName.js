import React from 'react';
import PropTypes from 'prop-types';

const <%= componentName %> = (props) => {
  return (
    <div {...props}>It works</div>
  )
};

<%= componentName %>.propTypes = {
  type: PropTypes.string
};

<%= componentName %>.defaultProps = {
  type: 'button'
};

export default <%= componentName %>;
