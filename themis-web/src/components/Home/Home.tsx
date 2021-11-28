import { Typography, Button } from '@mui/material';
import React from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { USER_BETS } from '../../storage/constants';

export function Home() {
    const clearBetsCache = () => {
        localStorage.setItem(USER_BETS, "{}");
    }
    return (
        <React.Fragment>
             <div>Home</div>
             <Button onClick={clearBetsCache}>Clear Bets Cache</Button>
        </React.Fragment>
    );
}