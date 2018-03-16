import React from 'react';
import PropTypes from 'prop-types';
import {cosyMeta} from '../package.json';

const <%= componentName %> = (props) => {
  // merge default data from package.json into props
  props = Object.assign({}, cosyMeta.defaultData, props);

  return (
    <div {...props}>{props.text}</div>
  )
};

<%= componentName %>.propTypes = {
  text: PropTypes.string
};

export default <%= componentName %>;
