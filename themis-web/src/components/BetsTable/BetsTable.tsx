import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Chip,
    Typography
} from '@mui/material';
import { BetMade } from '../../interfaces/Bet';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { etherscanKovan } from '../../etherscan/constants';
import { CampaignContractProperties } from '../../interfaces/CampaignContract';
import { CampaignContract } from '../../web3/campaign';

export interface BetsTableProps {
    betsMade: BetMade[];
    contractProps: CampaignContractProperties[];
}

export function BetsTable(props: BetsTableProps) {
    const { fetch } = useWeb3ExecuteFunction();

    const claimWinnings = (betMade: BetMade, won: boolean) => () => {
        if (won) {
            const contract = new CampaignContract(betMade.transaction.contractAddress);
            fetch(contract.claimParams());
        }
    }

    const getStatusComp = (betMade: BetMade) => {
        if (!props.contractProps) {
            return <></>;
        }
        const cp = props.contractProps.find(cp => cp.contractAddress === betMade.transaction.contractAddress);
        let status = <Typography>No contract found</Typography>
        if (cp !== undefined) {
            let chipProps: {
                label: string;
                color: "secondary" | "success" | "error" | "primary" | "default" | "info" | "warning" | undefined;
            } = {
                label: "",
                color: undefined
            };
            if (cp.isFulfilled.status.loading) {
                chipProps.label = "Loading...";
                chipProps.color = "secondary";
            } else if (cp.isFulfilled.status.error !== "") {
                chipProps.label = "Error";
                chipProps.color = undefined;
            } else if (cp.isFulfilled.value) {
                if (cp.winnerTeamId.status.loading) {
                    chipProps.label = "Loading...";
                    chipProps.color = "secondary";
                } else if (cp.isFulfilled.status.error) {
                    chipProps.label = "Error";
                    chipProps.color = undefined;
                } else if (cp.winnerTeamId.value === betMade.bet.teamID) {
                    chipProps.label = "Won - Unclaimed";
                    chipProps.color = "success";
                } else {
                    chipProps.label = "Lost";
                    chipProps.color = "error";
                }
            } else {
                chipProps.label = "Active";
                chipProps.color = "primary";
            }
            status = <Chip
                label={chipProps.label}
                color={chipProps.color}
                clickable={chipProps.label==="Won"}
                onClick={claimWinnings(betMade, chipProps.label==="Won")}
            />
        }
        return status;
    }
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Match</TableCell>
                        <TableCell>Side Selected</TableCell>
                        <TableCell>Amount (ETH)</TableCell>
                        <TableCell>Tx Hash</TableCell>
                        <TableCell>Contract</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.betsMade.map((betMade) => {
                            return (
                                <TableRow>
                                    <TableCell>{betMade.bet.matchID}</TableCell>
                                    <TableCell>{betMade.bet.teamID}</TableCell>
                                    <TableCell>{betMade.bet.bidAmount}</TableCell>
                                    <TableCell>
                                        <ExternalLink
                                            label="Etherscan"
                                            href={etherscanKovan.txUrl+betMade.transaction.transactionHash}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ExternalLink
                                            label="Etherscan"
                                            href={etherscanKovan.contractUrl+betMade.transaction.contractAddress}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        { getStatusComp(betMade) }
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </>
    )
}