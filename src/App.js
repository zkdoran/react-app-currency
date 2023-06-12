import logo from './logo.svg';
import './App.css';
import { Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';


const App = () => {
  return (
    <Router basename="/react-app-currency">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p>test</p>
        <Link className="navbar-brand" to="/">Broke or Balling</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
