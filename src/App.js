import React, { Component } from 'react';
import './App.css';
import Home from './modules/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News feeds: https://newsapi.org/</h1>
        </header>
        <Home/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
