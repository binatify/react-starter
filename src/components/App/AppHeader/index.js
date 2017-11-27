import React, { Component } from 'react';
import logo from './logo.svg';

export default class AppHeader extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Mook</h1>
      </header>
    );
  }
}
