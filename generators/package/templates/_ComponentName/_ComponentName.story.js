import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';
import { cosyMeta } from './package.json';
<%_ if(useLayoutComponent){ _%>
import { select } from '@storybook/addon-knobs/react';
<%_ } _%>
import Readme from './README.md';
import Guidelines from './GUIDELINES.md';
<%_ if(useProjectSwitch){ _%>
import withProjectSwitchDecorator from '../../addons/project-switch-addon';
<%_ } _%>

import <%= componentName %> from './index';
import props from './data/<%= componentName %>.data.json';
<%_ if(useLayoutComponent){ _%>
import { layoutContext } from '@zurichversicherung/layout-component';
<%_ } _%>

const stories = storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  .addDecorator(withInfo())
  .addDecorator(withReadme(Readme))
  <%_ if(useProjectSwitch){ _%>
  .addDecorator(withProjectSwitchDecorator({projects: cosyMeta.projects}))
  <%_ } _%>
  .addParameters({info: {Guidelines}});

stories
  .add('default', () => (
    <%_ if(useLayoutComponent){ _%>
    <<%= componentName %>
      {...props}
      customLayoutProps={{
        context: select('Layout', layoutContext)
      }}
    />
    <%_ } else{ _%>
    <<%= componentName %> {...props}/>
    <%_ } _%>
  ));
