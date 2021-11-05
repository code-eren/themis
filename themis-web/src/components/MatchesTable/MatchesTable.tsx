import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@mui/material';
import { Match } from '../../interfaces/Match';
import { BetsForMatch } from '../../storage/BetStorage';
import { convertOddsToString } from '../../interfaces/TeamOdds';
import * as utils from '../../utils';

interface MatchesTableProps {
    matches: Match[];
    onMatchClicked: (matchID: string) => void;
}

export function MatchesTable(props: MatchesTableProps) {
    const handleTableRowClicked = (match: Match) => props.onMatchClicked(match.ID);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Home Team</TableCell>
                    <TableCell>Away Team</TableCell>
                    <TableCell>Home</TableCell>
                    <TableCell>Away</TableCell>
                    <TableCell>Tie</TableCell>
                    <TableCell>Start</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.matches.map((match) => (
                        <TableRow sx={{cursor: "pointer"}} hover={true} onClick={() => handleTableRowClicked(match)}>
                            <TableCell>{match.home.team.shortName}</TableCell>
                            <TableCell>{match.away.team.shortName}</TableCell>
                            <TableCell>{utils.otos(match.home.odds)}</TableCell>
                            <TableCell>{utils.otos(match.tie.odds)}</TableCell>
                            <TableCell>{utils.otos(match.away.odds)}</TableCell>
                            <TableCell>{utils.ttos(match.startTimestamp)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    );
}