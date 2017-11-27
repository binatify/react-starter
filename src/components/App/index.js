import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PostIndex from '../Post/Index';
import PostShow from '../Post/Show';
import './style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={PostIndex} />
          <Route exact path="/posts/:id" component={PostShow} />
        </div>
      </Router>
    );
  }
}

export default App;
