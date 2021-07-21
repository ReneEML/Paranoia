import React from 'react';
import './App.css';
import Routing from './components/Routing'

class App extends React.Component{
  render(){
    return (
        <header>
          <Routing />
        </header>
    );
  }
}

export default App;
