import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AllBets } from './components/AllBets/AllBets';
import { Home } from './components/Home/Home';
import { MyBets } from './components/MyBets/MyBets';
import { NavBar } from './components/NavBar/NavBar';
function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/allbets">
          <AllBets/>
        </Route>
        <Route path="/mybets">
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
