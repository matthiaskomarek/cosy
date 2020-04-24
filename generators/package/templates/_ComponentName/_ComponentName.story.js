import React<%_ if(useSeparateBundle){ _%>, {Fragment}<%_ } _%> from 'react';
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import {cosyMeta} from './package.json';
<%_ if(useLayoutComponent){ _%>
import {select} from '@storybook/addon-knobs/react';
<%_ } _%>
import Readme from './README.md';
<%_ if(useProjectSwitch){ _%>
import withProjectSwitchDecorator from '../../addons/project-switch-addon';
<%_ } _%>
<%_ if(useSeparateBundle){ _%>
import CallFunction from '../../addons/call-function';
<%_ } _%>

import <%= componentName %> from './index';
import defaultData from './data/default.json';
<%_ if(useSeparateBundle){ _%>
import <%= componentName %>ViewModel from './bundle';
<%_ } _%>
<%_ if(useLayoutComponent){ _%>
import { layoutContext } from '@zurichversicherung/layout-component';
<%_ } _%>

storiesOf(`${cosyMeta.type}|<%= componentName %>`, module)
  .addDecorator(withReadme(Readme))
  <%_ if(useProjectSwitch){ _%>
  .addDecorator(withProjectSwitchDecorator({projects: cosyMeta.projects}))
  <%_ } _%>
  .add('with default', () => (
    <%_ if(useSeparateBundle){ _%>
    <Fragment>
    <%_ } _%>
    <%_ if(useLayoutComponent){ _%>
    <<%= componentName %>
      {...defaultData}
      customLayoutProps={{
        context: select('Layout', layoutContext)
      }}
    />
    <%_ } else{ _%>
    <<%= componentName %> {...defaultData}/>
    <%_ } _%>
    <%_ if(useSeparateBundle){ _%>
      <CallFunction call={() => {
        new <%= componentName %>ViewModel();
      }} />
    </Fragment>
    <%_ } _%>
  ));
