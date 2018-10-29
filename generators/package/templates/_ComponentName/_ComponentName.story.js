import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';
import { cosyMeta } from './package.json';

import Readme from './README.md';
import Guidelines from './GUIDELINES.md';

<%_ if(useProjectSwitch){ _%>
import withProjectSwitchDecorator from '../../addons/project-switch-addon';
<%_ } _%>

import <%= componentName %> from './index';

const stories = storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  <%_ if(useProjectSwitch){ _%>
  .addDecorator((story, context) => withInfo(Guidelines)(story)(context))
  .addDecorator(withReadme(Readme))
  .addDecorator(withProjectSwitchDecorator({projects: cosyMeta.projects}));
  <%_ } else{ _%>
  .addDecorator((story, context) => withInfo(Guidelines)(story)(context))
  .addDecorator(withReadme(Readme));
  <%_ } _%>


stories
  .add('simple story for <%= componentName %>', () => (
    <<%= componentName %>/>
  ));
