import { render, screen } from '@testing-library/react';
import HomeData from './HomeData';
import {shallow} from 'enzyme';

describe('test cases for HomeData',()=>{

  it('should render the HomeData component correctly',()=>{
    shallow(<HomeData />);
  });

  it("must render a loading span before api call success", () => {
    let wrapper = shallow(<HomeData />)
    expect(wrapper.find("LoadingIndicator").exists()).toBeTruthy();
});

})

