import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Stack } from '@mui/material';
import { useMoralis } from 'react-moralis';

export function NavBar() {
    const { authenticate, logout, isAuthenticated } = useMoralis();
    const routes = [
        {
            path: "/matches",
            name: "Matches"
        },
        {
            path: "/mybets",
            name: "My Bets"
        }
    ]
    
    const handleLogin = () => {
        authenticate();
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>Themis</Typography>
                <Stack spacing={2} direction="row">
                {
                    routes.map(
                        (route) => {
                            return (
                                <Link
                                    href={route.path}
                                    color="inherit"
                                    underline="none"
                                >
                                    {route.name}
                                </Link>
                            );
                        }
                    )
                }
                {
                    !isAuthenticated ?
                    <Typography variant="inherit" color="inherit" sx={{cursor: "pointer"}} onClick={handleLogin}>
                        CONNECT WALLET
                    </Typography> :
                    <Typography variant="inherit" color="inherit" sx={{cursor: "pointer"}} onClick={handleLogout}>
                        DISCONNECT WALLET
                    </Typography>
                }
                </Stack>
            </Toolbar>
        </AppBar>
    )
}