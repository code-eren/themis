import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BetCheckoutState } from '../../../interfaces/BetCheckoutState';
import { TeamOdds, convertOddsToString } from '../../../interfaces/TeamOdds';
import { MatchesState } from '../../../interfaces/MatchesState';

interface MatchDetailsProps {
    matchesState: MatchesState;
    betCheckoutState: BetCheckoutState;
    onSelectSide: (teamID: string) => void
}

export function MatchDetails(props: MatchDetailsProps) {
    const [teamOddsSelected, setTeamOddsSelected] = React.useState<TeamOdds|null>(null);
    const match = props.matchesState.matches.find((match) => match.ID === props.betCheckoutState.matchID);
    const allTeamOdds = match ? [
        match.home,
        match.tie,
        match.away,
    ] : [];
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
                                sx={{cursor: "pointer", backgroundColor: teamOddsSelected?.team.ID === teamOdds.team.ID ? '#ededed' : '#ffffff'}}
                                onClick={() => props.onSelectSide(teamOdds.team.ID)}
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