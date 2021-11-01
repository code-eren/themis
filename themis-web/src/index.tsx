import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';

const moralisCreds = {
  appId: "7Iy53OzFq24gwU0uVz1hHouvuutzjxzw52L5U6Jm",
  serverUrl: "https://slhgxdebn0lr.usemoralis.com:2053/server"
};

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={moralisCreds.appId} serverUrl={moralisCreds.serverUrl}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
