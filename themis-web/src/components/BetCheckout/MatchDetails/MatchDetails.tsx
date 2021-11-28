import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BetCheckoutState } from '../../../interfaces/BetCheckoutState';
import { TeamOdds, convertOddsToString } from '../../../interfaces/TeamOdds';
import { Match } from '../../../interfaces/Match';
import { selectSide } from '../../../redux/actions/BetCheckoutActions';

interface MatchDetailsProps {
    match: Match;
    betCheckoutState: BetCheckoutState;
}

export function MatchDetails(props: MatchDetailsProps) {
    const [teamOddsSelected, setTeamOddsSelected] = React.useState<TeamOdds|null>(null);
    const allTeamOdds = [
        props.match.home,
        props.match.tie,
        props.match.away,
    ];
    return (
        <Box sx={{padding: 2}}>
            <Grid container>
                <Grid xs={12} sx={{margin: 2}}>
                    <Typography textAlign="center">Please select the side you would like to bet on.</Typography>
                </Grid>
                {
                    allTeamOdds.map((teamOdds) => {
                        return (
                            <Grid
                                container
                                direction="column"
                                xs={4}
                                sx={{cursor: "pointer", backgroundColor: props.betCheckoutState.bet.teamID === teamOdds.team.ID ? '#ededed' : '#ffffff', ":hover": {
                                    backgroundColor: '#ededed'
                                }}}
                                onClick={() => selectSide(teamOdds.team.ID)}
                            >
                                <Grid item>
                                    <Typography sx={{fontWeight: teamOddsSelected?.team === teamOdds.team ? 'medium' : 'regular'}} textAlign="center">{teamOdds.team.shortName}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{fontWeight: teamOddsSelected?.team === teamOdds.team ? 'regular' : 'light'}} textAlign="center">{convertOddsToString(teamOdds.odds)}</Typography>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    )
}