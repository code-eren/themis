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
import { setError } from './redux/actions/MatchesActions';
import { CampaignContract } from './web3/campaign';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { store } from './storage/redux-store';
import { Button } from '@mui/material';

function App() {
  const {fetch} = useWeb3ExecuteFunction();
  useEffect(() => {
    setLoading();
    api.getMatches().then((matches) => {
      setMatches(matches);
      setLoading(false);
    }, (error) => {
      // TODO: add back in
      // setError(error.message); 
      setLoading(false);
    });
  }, []);

  const onClick = () => {
    let matches = store.getState().matches.matches;
    const contracts = matches.map(
      (match) => new CampaignContract(match.contractAddress)
    );
    contracts.forEach((contract) => fetch(contract.isFulfilledParams()));
    contracts.forEach((contract) => fetch(contract.winnerParams())); 
  }
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
              <Button onClick={onClick}>Click</Button>
              <Home/>
            </Route>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
