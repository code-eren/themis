import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AllMatches from './containers/AllMatchesContainer';
import { Home } from './components/Home/Home';
import { NavBar } from './components/NavBar/NavBar';
import * as api from './campaign-manager-api';
import { useEffect } from 'react';
import { setLoading, setMatches } from './redux/actions/MatchesActions';
import { MyBets } from './components/MyBets/MyBets';

function App() {
  useEffect(() => {
    setLoading();
    api.getMatches().then((matches) => {
      setMatches(matches);
      setLoading(false);
    });
  });
  return (
    <React.Fragment>      
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
    </React.Fragment>
  );
}

export default App;
