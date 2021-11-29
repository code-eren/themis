import { useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
import { CampaignContractProperties } from "../../interfaces/CampaignContract";
import { Typography, Paper, Container } from '@mui/material';
import { getMatchContracts, MatchContract } from "../../redux/selectors/MatchContractSelectors";
import { Log } from "../../interfaces/Log";
import { Moralis } from 'moralis';

export interface TrendsProps {
    matchContracts: MatchContract[];
    logs: Log[];
}

export function Trends (props: TrendsProps) {
    console.log(props.matchContracts.filter((mc) => mc.contract.addressToBidder.status.error !== "").map((mc) => mc.contract.addressToBidder))
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Trends
                </Typography>
                {
                props.logs.map(log => {
                    const bid = log.event.returnValues;
                    const match = props.matchContracts.find((mc) => mc.contract.contractAddress === log.event.address);
                    return (
                        <Typography textAlign="center" margin="10px">
                            {bid.bidder.substring(0, 8)}... bid {Moralis.Units.FromWei(bid.amount, 18)} ETH on {bid.side} for match {match?.match.ID}
                        </Typography>
                    )
                })
            }
            </Paper>
        </Container>
    )
}