import { Container, Dialog, Paper, Typography } from '@mui/material';
import React from 'react';
import { MatchesTable } from '../MatchesTable/MatchesTable';
import { MatchesState } from '../../interfaces/MatchesState';
import BetCheckoutContainer from '../../containers/BetCheckoutContainer';
import { BetCheckoutState } from '../../interfaces/BetCheckoutState';
import { DispatchProp } from 'react-redux';

export interface AllMatchesProps {
    matchesState: MatchesState;
    betCheckoutState: BetCheckoutState;
    selectMatch: (matchID: string) => void;
    onCancel: () => void;
}

export function AllMatches(props: AllMatchesProps) {
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Matches
                </Typography>
                <MatchesTable matches={props.matchesState.matches} onMatchClicked={props.selectMatch} />
            </Paper>
            <Dialog onClose={() => props.onCancel()} open={props.betCheckoutState.matchID !== ""}>
                {
                    <BetCheckoutContainer />
                }
            </Dialog>
        </Container>
    );
}