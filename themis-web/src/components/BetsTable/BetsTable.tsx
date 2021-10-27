import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@mui/material';
import { Bet } from '../../interfaces/Bet';
import { BetsForMatch } from '../../storage/BetStorage';
import { convertOddsToString } from '../../interfaces/TeamOdds';

interface BetsTableProps {
    bets?: Bet[];
    enrichedBets?: BetsForMatch[];
    setClickedBet?: (clicked: Bet) => void
}

export function BetsTable(props: BetsTableProps) {
    const handleTableRowClicked = (bet: Bet) => {
        if (props.setClickedBet !== undefined) {
            props.setClickedBet(bet);
        } 
    };
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Home Team</TableCell>
                    <TableCell>Away Team</TableCell>
                    <TableCell>Home</TableCell>
                    <TableCell>Away</TableCell>
                    <TableCell>Tie</TableCell>
                    {
                        props.enrichedBets !== undefined && <TableCell>Amount (ETH)</TableCell>
                    }
                    <TableCell>Start</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.bets && props.bets.map((bet) => (
                        <TableRow onClick={() => handleTableRowClicked(bet)}>
                            <TableCell>{bet.homeTeam}</TableCell>
                            <TableCell>{bet.awayTeam}</TableCell>
                            <TableCell>{bet.homeOdds > 0 && "+"}{bet.homeOdds}</TableCell>
                            <TableCell>{bet.awayOdds > 0 && "+"}{bet.awayOdds}</TableCell>
                            <TableCell>{bet.awayOdds > 0 && "+"}{bet.tieOdds}</TableCell>
                            <TableCell>{bet.gameStartTime.toLocaleDateString("en-US")}</TableCell>
                        </TableRow>
                    ))
                }
                {
                    props.enrichedBets && props.enrichedBets.map((enrichedBet) => {
                        return enrichedBet.bets.map((bet) => {
                            return <TableRow>
                                <TableCell>{enrichedBet.match.homeTeam}</TableCell>
                                <TableCell>{enrichedBet.match.awayTeam}</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: enrichedBet.match.homeTeam === bet.teamOddsSelected?.team ? 'bold' : 'regular'
                                    }}
                                >{convertOddsToString(enrichedBet.match.homeOdds)}</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: enrichedBet.match.awayTeam === bet.teamOddsSelected?.team ? 'bold' : 'regular'
                                    }}
                                >{convertOddsToString(enrichedBet.match.awayOdds)}</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "Tie" === bet.teamOddsSelected?.team ? 'bold' : 'regular'
                                    }}
                                >{convertOddsToString(enrichedBet.match.tieOdds)}</TableCell>
                                <TableCell>{bet.amountToBet}</TableCell>
                                <TableCell>{new Date(enrichedBet.match.gameStartTime).toLocaleDateString("en-US")}</TableCell>
                            </TableRow>;
                        })
                    })
                }
            </TableBody>
        </Table>

    );
}