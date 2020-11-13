import React from 'react'
import './App.css';
import Header from './header';
import Bottom from './bottom';
import Provider from './provider'
import { store } from './redux';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    
    return ( 
      <Provider store={store}>
        <Header />
        <Bottom />
      </Provider>
     );
  }
}
 