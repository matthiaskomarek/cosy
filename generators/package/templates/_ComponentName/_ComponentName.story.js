import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { cosyMeta } from './package.json';

import Readme from './README.md';

<%_ if(useProjectSwitch){ _%>
import withProjectSwitchDecorator from '../../addons/project-switch-addon';
<%_ } _%>
import <%= componentName %> from './index';

const stories = storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  <%_ if(useProjectSwitch){ _%>
  .addDecorator(withReadme(Readme))
  .addDecorator(withProjectSwitchDecorator({projects: cosyMeta.projects}));
  <%_ } else{ _%>
  .addDecorator(withReadme(Readme));
  <%_ } _%>


stories
  .add('simple story for <%= componentName %>', () => (
    <<%= componentName %>/>
  ));
