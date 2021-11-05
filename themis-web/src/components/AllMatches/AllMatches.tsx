import { Container, Dialog, Paper, Typography } from '@mui/material';
import { Match } from '../../interfaces/Match';
import React from 'react';
import { MatchesTable } from '../MatchesTable/MatchesTable';
// import BetCheckoutContainer from '../../containers/BetCheckoutContainer';
import { MatchesState } from '../../interfaces/MatchesState';

export interface AllMatchesProps {
    matchesState: MatchesState;
    selectMatch: (matchID: string) => void
}

export function AllMatches(props: AllMatchesProps) {

    const [betToBuy, setBetToBuy] = React.useState<Match | null>(null);
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Matches
                </Typography>
                <MatchesTable matches={props.matchesState.matches} onMatchClicked={props.selectMatch} />
            </Paper>
            <Dialog onClose={() => setBetToBuy(null)} open={betToBuy !== null}>
                {/* {
                    betToBuy && <BetCheckoutContainer />
                } */}
            </Dialog>
        </Container>
    );
}