import { Container, Dialog, Paper, Typography } from '@mui/material';
import { Bet } from '../../interfaces/Bet';
import React from 'react';
import { BetsTable } from '../BetsTable/BetsTable';
import { BetCheckout } from '../BetCheckout/BetCheckout';

function createBet(
    awayTeam: string,
    homeTeam: string,
    awayOdds: number,
    homeOdds: number,
    tieOdds: number,
    gameStartTime: Date
): Bet {
    return { awayTeam, homeTeam, awayOdds, homeOdds, tieOdds, gameStartTime };
}

export function AllBets() {
    const randDate = new Date('2021-10-17');
    const bets = [
        createBet("Real Madrid", "Barcelona", 200, -200, 0, randDate),
        createBet("Manchester City", "Paris Saint Germain", 200, -200, 0, randDate),
        createBet("Arsenal", "Liverpool", 200, -200, 0, randDate),
        createBet("Chelsea", "Bayern Munich", 200, -200, 0, randDate),
    ];
    const [betToBuy, setBetToBuy] = React.useState<Bet | null>(null);
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    All Bets
                </Typography>
                <BetsTable bets={bets} setClickedBet={setBetToBuy} />
            </Paper>
            <Dialog onClose={() => setBetToBuy(null)} open={betToBuy !== null}>
                {
                    betToBuy && <BetCheckout betToBuy={betToBuy} />
                }
            </Dialog>
        </Container>
    );
}