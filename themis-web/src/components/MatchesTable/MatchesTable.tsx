import {
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Checkbox
} from '@mui/material';
import { etherscanKovan } from '../../etherscan/constants';
import { Match } from '../../interfaces/Match';
import * as utils from '../../utils';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import {
    CheckBoxOutlineBlank,
    CheckBox,
    Check,
    Close
} from '@mui/icons-material';

interface MatchesTableProps {
    matches: Match[];
    onMatchClicked: (matchID: string) => void;
}

export function MatchesTable(props: MatchesTableProps) {
    const handleTableRowClicked = (match: Match) => {
        props.onMatchClicked(match.ID);
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
                    <TableCell>Start</TableCell>
                    <TableCell>Contract</TableCell>
                    <TableCell>Keeper?</TableCell>
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
                            <TableCell>
                                <ExternalLink label="Etherscan" href={etherscanKovan.contractUrl+match.contractAddress} />
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    disableRipple
                                    checked={true}
                                    checkedIcon={match.isKeeperRegistered ? <Check /> : <Close />} 
                                    color={match.isKeeperRegistered ? "success" : "error"} 
                                />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    );
}