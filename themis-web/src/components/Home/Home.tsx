import { Typography } from '@mui/material';
import React from 'react';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import CampaignFactoryAbi from '../../abis/CampaignFactory.json';

export function Home() {
    const {user} = useMoralis();
    const {data, error, isLoading, isFetching, setData} = useWeb3ExecuteFunction({
        abi: CampaignFactoryAbi,
        contractAddress: "0xf3a5576ACC965aE84d7F47d3db0aFe4EB5eFc296",
        functionName: "getAddress",
        params: {
            _gameId: 702
        }
    });

    return (
        <React.Fragment>
             <div>Home</div>
            <Typography>
                {user?.id}
            </Typography>
            <Typography>
                Data: {JSON.stringify(data)}
            </Typography>
            <Typography>
                Error: {JSON.stringify(error)}
            </Typography>
            <Typography>
                isLoading: {JSON.stringify(isLoading)}
            </Typography>
            <Typography>
                isFetching: {JSON.stringify(isFetching)}
            </Typography>
        </React.Fragment>
    );
}