import { render, screen } from '@testing-library/react';
import App from './App';
import {shallow} from 'enzyme';

describe('App.js test',()=>{

  it('should render the app correctly',()=>{
    shallow(<App />);
  })
})

