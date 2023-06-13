import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Converter from './Converter';
import Worldlist from './Worldlist';
import Countries from './Countries';

const App = () => {
  return (
    <Router basename="/react-app-currency">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Are you Rich?</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Start Over</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Converter/">You vs. The Destination</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/Worldlist/">You vs. The World</Link>
            </li>
          </ul>
        </div>      
      </nav>
      <Switch>
        <Route path="/" exact component={Countries} />
        <Route path="/Converter/" component={Converter} />
        <Route path="/Worldlist/" component={Worldlist} />
      </Switch>
    </Router>
  );
}

export default App;