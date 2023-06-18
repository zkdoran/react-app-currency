import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import Converter from './Converter';
import Worldlist from './Worldlist';

const App = () => {
  return (
    <Router basename="/react-app-currency">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/">Fluctuations</Link>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link className="nav-link active" to="/">Start Over</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Converter/" component={Converter} />
        <Route path="/Worldlist/" component={Worldlist} />
      </Switch>
      <footer className="text-center text-lg-start mt-auto" id="footer">
        <p>Created by Zach Doran. <a href="https://www.freepik.com/free-vector/arrow-sticker-two-way-traffic-road-direction-sign-pink-holographic-design-vector_18879888.htm#query=opposite%20directions&position=36&from_view=search&track=ais">Image by rawpixel.com</a> on Freepik</p>
      </footer>
    </Router>    
  );
}

export default App;