import React, { Component } from 'react';
import './App.css';
import Nav from './Nav'
import GameBoard from './GameBoard'


class App extends Component {

  render(){
    return(
      <div>
        <Nav />
        <GameBoard />
      </div>
    )
  }
}

export default App;
