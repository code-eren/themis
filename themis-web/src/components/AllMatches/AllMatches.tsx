import { Container, Dialog, Paper, Typography } from '@mui/material';
import { Match } from '../../interfaces/Match';
import React from 'react';
import { BetsTable } from '../BetsTable/BetsTable';
import { BetCheckout } from '../BetCheckout/BetCheckout';
import BetCheckoutContainer from '../../containers/BetCheckoutContainer';

function createBet(
    awayTeam: string,
    homeTeam: string,
    awayOdds: number,
    homeOdds: number,
    tieOdds: number,
    gameStartTime: Date
): Match {
    return { awayTeam, homeTeam, awayOdds, homeOdds, tieOdds, gameStartTime };
}

export function AllMatches() {
    const randDate = new Date('2021-10-17');
    const bets = [
        createBet("Real Madrid", "Barcelona", 200, -200, 0, randDate),
        createBet("Manchester City", "Paris Saint Germain", 200, -200, 0, randDate),
        createBet("Arsenal", "Liverpool", 200, -200, 0, randDate),
        createBet("Chelsea", "Bayern Munich", 200, -200, 0, randDate),
    ];
    const [betToBuy, setBetToBuy] = React.useState<Match | null>(null);
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Matches
                </Typography>
                <BetsTable bets={bets} setClickedBet={setBetToBuy} />
            </Paper>
            <Dialog onClose={() => setBetToBuy(null)} open={betToBuy !== null}>
                {
                    betToBuy && <BetCheckoutContainer />
                }
            </Dialog>
        </Container>
    );
}