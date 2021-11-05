import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AllMatches from './containers/AllMatchesContainer';
import { Home } from './components/Home/Home';
import { MyBets } from './components/MyBets/MyBets';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/matches">
          <AllMatches />
        </Route>
        <Route path="/bets">
          <MyBets/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
