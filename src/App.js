import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Character from './Character';
import Home from './Home'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    return (
      <main className="content">
        <div>
          <Router><div><Switch>
          <Route exact path='/' component={Home} />
            <Route exact path='/Character' component={Character} />
          </Switch></div></Router>
        </div>
      </main>
      
    );
  }
}
export default App;