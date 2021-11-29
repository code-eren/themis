import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Stack } from '@mui/material';
import { useMoralis } from 'react-moralis';

export function NavBar() {
    const { authenticate, logout, isAuthenticated, enableWeb3 } = useMoralis();
    const routes = [
        {
            path: "/matches",
            name: "Matches"
        },
        {
            path: "/bets",
            name: "My Bets"
        },
        {
            path: "/trends",
            name: "Trends"
        },
    ]
    
    const handleLogin = () => {
        authenticate().then(() => enableWeb3());
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <AppBar position="sticky">
            <Toolbar
            >
                <Typography variant="h6" sx={{flexGrow: 1}}>Themis</Typography>
                <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
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
                    <Typography variant="inherit" bgcolor="white" color="#1976d2" sx={{cursor: "pointer", padding: '10px', borderRadius: '10px'}} onClick={handleLogin}>
                        CONNECT WALLET
                    </Typography> :
                    <Typography variant="inherit" bgcolor="white" color="#1976d2" sx={{cursor: "pointer", padding: '10px', borderRadius: '10px'}} onClick={handleLogout}>
                        DISCONNECT WALLET
                    </Typography>
                }
                </Stack>
            </Toolbar>
        </AppBar>
    )
}