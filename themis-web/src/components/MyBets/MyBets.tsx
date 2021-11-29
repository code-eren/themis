import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { UserBetsState } from '../../interfaces/UserBetsState';
import MyBetsContainer from '../../containers/MyBetsContainer';

export function MyBets() {
    return (
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    My Bets
                </Typography>
                <MyBetsContainer />
            </Paper>
        </Container>
    );
}