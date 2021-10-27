import React from 'react';
import { Container, Dialog, Paper, Typography } from '@mui/material';
import { BetsTable } from '../BetsTable/BetsTable';
import { getBets } from '../../storage/BetStorage';

export function MyBets() {
    const myBets = getBets();
    return (
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    My Bets
                </Typography>
                <BetsTable enrichedBets={myBets} />
            </Paper>
        </Container>
    );
}