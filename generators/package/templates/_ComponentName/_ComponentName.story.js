import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/react';
import { cosyMeta } from './package.json';

import Readme from './README.md';

import { <%= componentName %> } from './index';

const stories = storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  .addDecorator(withReadme(Readme))
  .addDecorator(withKnobs);

stories
  .add('simple story for <%= componentName %>', () => (
    <<%= componentName %>/>
  ));
