import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
  addonPanelInRight: true
});

const req = require.context('../packages', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
