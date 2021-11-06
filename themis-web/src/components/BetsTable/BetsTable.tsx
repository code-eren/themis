import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@mui/material';
import { Bet } from '../../interfaces/Bet';
import * as utils from '../../utils';

interface BetsTableProps {
    bets: Bet[];
    onBetClicked: (betID: string) => void;
}

export function BetsTable(props: BetsTableProps) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Match</TableCell>
                    <TableCell>Side Selected</TableCell>
                    <TableCell>Amount (ETH)</TableCell>
                    <TableCell>Submitted</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.bets.map((bet) => (
                        <TableRow>
                            <TableCell>{bet.matchID}</TableCell>
                            <TableCell>{bet.teamID}</TableCell>
                            <TableCell>{bet.bidAmount}</TableCell>
                            <TableCell>{utils.ttos(bet.timestamp)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}