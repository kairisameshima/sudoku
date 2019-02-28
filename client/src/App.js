import React, { Component } from 'react';
import './App.css';
import Sudoku from './components/sudoku';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sudoku />
      </div>
    );
  }
}

export default App;
