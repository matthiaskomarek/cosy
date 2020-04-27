import React from 'react';
import { mount } from 'enzyme';
import <%= componentName %> from './<%= componentName %>';
import defaultData from '../data/default.json';

describe('<%= componentName %>', () => {
  it('should match the snapshot', () => {
    const wrapper = mount(<<%= componentName %> {...defaultData}/>);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
