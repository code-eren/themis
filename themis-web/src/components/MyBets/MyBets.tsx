import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
// import { BetsTable } from '../MatchesTable/MatchesTable';
import { getBets } from '../../storage/redux-store';

export function MyBets() {
    const myBets = getBets();
    return (
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    My Bets
                </Typography>
                {/* <BetsTable enrichedBets={myBets} /> */}
            </Paper>
        </Container>
    );
}