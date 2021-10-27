import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Stack } from '@mui/material';
export function NavBar() {
    const routes = [
        {
            path: "/allbets",
            name: "All Bets"
        },
        {
            path: "/mybets",
            name: "My Bets"
        }
    ]
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
                </Stack>
            </Toolbar>
        </AppBar>
    )
}