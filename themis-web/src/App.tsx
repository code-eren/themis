import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AllMatches from './containers/AllMatchesContainer';
import Trends from './containers/TrendsContainer';
import { Home } from './components/Home/Home';
import { NavBar } from './components/NavBar/NavBar';
import * as api from './campaign-manager-api';
import { useEffect } from 'react';
import { setLoading, setMatches } from './redux/actions/MatchesActions';
import { MyBets } from './components/MyBets/MyBets';
import { setError } from './redux/actions/MatchesActions';
import { CampaignContract } from './web3/campaign';
import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from 'react-moralis';
import { store } from './storage/redux-store';
import { Button } from '@mui/material';
import { Log, Event } from './interfaces/Log';
import { addLog } from './redux/actions/LogsAction';
import { addBet } from './redux/actions/UserBetsActions';
import { BetMade } from './interfaces/Bet';
import { unEncodeTeamId } from './utils';
import { Moralis } from 'moralis';


function App() {
  const {fetch} = useWeb3ExecuteFunction();
  const { enableWeb3, web3, user } = useMoralis();
  const { account } = useMoralisWeb3Api();

  useEffect(() => {
    enableWeb3();
    setLoading();
    api.getMatches().then((matches) => {
      setMatches(matches);
      setLoading(false);
      const dummyContract = new CampaignContract("");
      enableWeb3();
      console.log(web3)
      if (web3 !== null) {
        matches.map((match) => {
          let contract = new web3.eth.Contract(dummyContract.abi, match.contractAddress);
          contract.events.BidSuccess({
            fromBlock: 0
          }).on("data", (event: Event) => {
            addLog({
              event,
              metadata: {
                timestamp: new Date().getTime()
              }
            })
          }, console.log);
        });
      }
    }, (error) => {
      // TODO: add back in
      // setError(error.message); 
      setLoading(false);
    });
  }, []);

  const sync = () => {
    let matches = store.getState().matches.matches;

    matches.map((match) => {
      account.getTransactions({
        chain: "kovan",
        address: match.contractAddress,
        from_block: 0
      }).then((txs) => {
        if(txs.result) {
          let state = store.getState();
          txs.result.forEach((tx) => {
            if (tx.from_address === user?.get('ethAddress')) {
              let log = state.logsState.logs.find((log) => log.event.transactionHash === tx.hash);
            let match = undefined;
            if (log !== undefined) {
              match = state.matches.matches.find((m) => m.contractAddress === log?.event.address);
            }
            if (log !== undefined && match !== undefined) {
              addBet({
                transaction: {
                  blockHash: tx.block_hash,
                  blockNumber: parseInt(tx.block_number) ?? 0,
                  contractAddress: match.contractAddress,
                  cumulativeGasUsed: parseInt(tx.receipt_cumulative_gas_used) ?? 0,
                  effectiveGasPrice: tx.gas_price,
                  from: tx.from_address,
                  gasUsed: parseInt(tx.receipt_gas_used) ?? 0,
                  logsBloom: "",
                  status: tx.receipt_status,
                  to: tx.to_address,
                  transactionHash: tx.hash,
                  transactionIndex: parseInt(tx.transaction_index) ?? 0,
                  type: "",
                  events: {}
                },
                bet: {
                  matchID: match.ID,
                  teamID: unEncodeTeamId(match, parseInt(log.event.returnValues.side) ?? -1),
                  bidAmount: Moralis.Units.FromWei(log.event.returnValues.amount, 18).toString()
                }
              })
            }
            }
          });
        }
      })
    })
  }

  const onClick = () => {
    let state = store.getState();
    const contracts = state.userBets.betsMade.map(
      (bet) => 
        {
          let match = state.matches.matches.find(m => m.ID === bet.bet.matchID);
          if (match) {
            return new CampaignContract(match.contractAddress);
          }
          return null;
        }
    );
    const userAddr = user?.get('ethAddress');

    const dummyContract = new CampaignContract("");
    contracts.forEach((contract) => {
      if (contract !== null) {
        contract.allPropsParams(userAddr).forEach(params => fetch(params))
        if (web3 !== null) {
          let c = new web3.eth.Contract(dummyContract.abi, contract.contractAddress);
          c.methods.addr2bidder(userAddr).call().then(console.log);
        }
      }
    })
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
            <Route path="/trends">
              <Trends />
            </Route>
            <Route path="/">
              <Button onClick={onClick}>Click</Button>
              <Button onClick={sync}>Sync</Button>
              <Home/>
            </Route>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
