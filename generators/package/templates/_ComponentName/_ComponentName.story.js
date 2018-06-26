import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import { cosyMeta } from './package.json';

import Readme from './README.md';

import {withHtmlDecorator} from '../../addons/html-preview-addon';
<%_ if(useProjectSwitch){ _%>
import withProjectSwitchDecorator from '../../addons/project-switch-addon';
<%_ } _%>
import <%= componentName %> from './index';

const stories = storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  .addDecorator(withReadme(Readme))
  .addDecorator(withKnobs)
  <%_ if(useProjectSwitch){ _%>
  .addDecorator(withHtmlDecorator)
  .addDecorator(withProjectSwitchDecorator({projects: cosyMeta.projects}));
  <%_ } else{ _%>
  .addDecorator(withHtmlDecorator);
  <%_ } _%>


stories
  .add('simple story for <%= componentName %>', () => (
    <<%= componentName %>/>
  ));
