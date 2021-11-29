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
    Check,
    Close
} from '@mui/icons-material';
import { MatchContract } from '../../redux/selectors/MatchContractSelectors';
import { CampaignContractProperties } from '../../interfaces/CampaignContract';
import { toast } from 'react-toastify';

interface MatchesTableProps {
    matchContracts: MatchContract[];
    onMatchClicked: (matchID: string) => void;
}

export function MatchesTable(props: MatchesTableProps) {
    const handleTableRowClicked = (match: Match, contract: CampaignContractProperties) => {
        if (contract.isFulfilled.value) {
            toast("Cannot bet on match.");
        } else {
            if (!match.isKeeperRegistered) {
                toast("This match does not have a keeper registered.")
            }
            props.onMatchClicked(match.ID);
        }
    };
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Home Team</TableCell>
                    <TableCell>Away Team</TableCell>
                    <TableCell>Home</TableCell>
                    <TableCell>Away</TableCell>
                    <TableCell>Tie</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>Contract</TableCell>
                    <TableCell>Keeper?</TableCell>
                    <TableCell>Taking Bets?</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.matchContracts.map((matchContracts) => {
                        const match = matchContracts.match;
                        const contract = matchContracts.contract;
                        let keeperCellResult = <Checkbox
                            disableRipple
                            checked={true}
                            checkedIcon={<Close />} 
                            color={"error"} 
                        />;
                        if (match.isKeeperRegistered && match.rawCampaign !== undefined && match.rawCampaign?.Campaign_KeeperAddress !== null) {
                            keeperCellResult = <ExternalLink href={match.rawCampaign.Campaign_KeeperAddress} label="Chainlink" />
                        }
                        return (
                            <TableRow sx={{cursor: "pointer"}} hover={true} onClick={() => handleTableRowClicked(match, contract)}>
                                <TableCell>{match.ID}</TableCell>
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
                                    {
                                        keeperCellResult
                                    }
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        disableRipple
                                        checked={true}
                                        checkedIcon={!contract.isFulfilled.value ? <Check /> : <Close />} 
                                        color={!contract.isFulfilled.value ? "success" : "error"} 
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>

    );
}