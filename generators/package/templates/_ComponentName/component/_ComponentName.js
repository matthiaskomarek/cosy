import React from 'react';
import PropTypes from 'prop-types';
<%_ if(useLayoutComponent){ _%>

import LayoutComponent from '@zurichversicherung/layout-component';
<%_ } _%>

const CSS_CLASS = Object.freeze({
  BASE: 'c-<%= packageBundleName %>'
});

const <%= componentName %> = props => {
  const cssClasses = !props.customClass ? [CSS_CLASS.BASE] : [CSS_CLASS.BASE, props.customClass.trim()];
  return (
    <%_ if(useLayoutComponent){ _%>
    <LayoutComponent
      customAttributes={props.customAttributes}
      customClass={cssClasses.join(' ')}
      {...props.customLayoutProps}
    >
      {props.text}
    </LayoutComponent>
    <%_ } else{ _%>
    <div className={cssClasses.join(' ')} {...props.customAttributes}>{props.text}</div>
    <%_ } _%>
  );
};

<%= componentName %>.propTypes = {
  customAttributes: PropTypes.object,
  customClass: PropTypes.string,
  <%_ if(useLayoutComponent){ _%>
  customLayoutProps: PropTypes.object,
  <%_ } _%>
  text: PropTypes.string
};

export default <%= componentName %>;
