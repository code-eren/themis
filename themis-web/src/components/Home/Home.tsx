import { Typography } from '@mui/material';
import React from 'react';
import { useMoralis } from 'react-moralis';

export function Home() {
    const {user} = useMoralis();
    return (
        <React.Fragment>
             <div>Home</div>
            <Typography>
                {user?.id}
            </Typography>
        </React.Fragment>
    );
}