
import {  mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { initialState, } from '../../reactContext/index'
import ContextAPI from '../ContextAPI';

it('context work fine', () => {
  const wrapper = mount(<ContextAPI />);
  // expect(wrapper.find('div').first().hasClass('content-theme')).toEqual(true)
  expect(wrapper.find('.content-theme').at(0)).toHaveText(initialState.theme)

  wrapper.find('.change-all').first().simulate('click');


  // color: "purple",
  // theme: "dark",
  
  expect(wrapper.find('.content-theme').first()).toHaveText('dark')
  
  expect(wrapper.find('.content-color').first()).toHaveText('purple')

  expect(toJson(wrapper)).toMatchSnapshot();

});