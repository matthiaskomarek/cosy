import React from 'react';
import { mount } from 'enzyme';

import <%= componentName %> from './<%= componentName %>';

describe('<%= componentName %>', () => {
  it('should render', () => {
    const wrapper = mount(<<%= componentName %>/>);

    expect(wrapper.find('.c-<%= packageBundleName %>').length).toBe(1);
  });
});
