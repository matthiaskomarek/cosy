import React from 'react';
import { storiesOf } from '@storybook/react';

import { <%= componentName %> } from './index';

const stories = storiesOf('<%= componentName %>', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
// stories.addDecorator(withKnobs);

stories
  .add('simple story for <%= componentName %>', () => (
    <<%= componentName %>/>
  ));
