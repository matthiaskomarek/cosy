import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';

initStoryshots({suite: 'Image storyshots', test: imageSnapshot({storybookUrl: 'http://localhost:9008/'})});
