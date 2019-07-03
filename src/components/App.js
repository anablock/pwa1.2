import React from 'react';
import LoginContainer from './LoginContainer';
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div id="container" className="inner-container">
            <LoginContainer />
          </div>
      </header>
    </div>
  );
}

export default App;
