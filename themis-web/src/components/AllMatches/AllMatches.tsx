import { Container, Dialog, Paper, Typography } from '@mui/material';
import React from 'react';
import { MatchesTable } from '../MatchesTable/MatchesTable';
import { MatchesState } from '../../interfaces/MatchesState';
import BetCheckoutContainer from '../../containers/BetCheckoutContainer';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { Match } from '../../interfaces/Match';
import { CircularProgress } from '@mui/material';
import { useMoralis } from 'react-moralis';
import { toast } from 'react-toastify';

export interface AllMatchesProps {
    matchesState: MatchesState;
    betCheckoutState: BetCheckoutState;
    selectMatch: (matchID: string) => void;
    onCancel: () => void;
    setMatches: (matches: Match[]) => void;
    setLoading: (loading: boolean) => void;
}

export function AllMatches(props: AllMatchesProps) {
    const {isAuthenticated} = useMoralis();
    const selectMatch = (matchID: string) => {
        if (!isAuthenticated) {
            toast("Please connect your wallet");
        } else {
            props.selectMatch(matchID);
        }
    }
    const result = props.matchesState.loading ? <CircularProgress/> :
    <MatchesTable matches={props.matchesState.matches} onMatchClicked={selectMatch} />;
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Matches
                </Typography>
                { result }
            </Paper>
            <Dialog onClose={props.onCancel} open={props.betCheckoutState.matchID !== ""} onBackdropClick={props.onCancel}>
                {
                    <BetCheckoutContainer />
                }
            </Dialog>
        </Container>
    );
}