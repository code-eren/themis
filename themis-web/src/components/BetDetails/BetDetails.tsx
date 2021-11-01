import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Match } from '../../interfaces/Match';
import { TeamOdds, convertOddsToString } from '../../interfaces/TeamOdds';

interface BetDetailsProps {
    bet: Match;
    teamOddsSelected: TeamOdds | null;
    setTeamOddsSelected: (teamOdds: TeamOdds) => void
}

export function BetDetails(props: BetDetailsProps) {
    const [teamOddsSelected, setTeamOddsSelected] = React.useState(props.teamOddsSelected);

    const allTeamOdds: TeamOdds[] = [
        {team: props.bet.homeTeam, odds: props.bet.homeOdds},
        {team: "Tie", odds: props.bet.tieOdds},
        {team: props.bet.awayTeam, odds: props.bet.awayOdds}
    ];

    const handleTeamOddsSelected = (teamOdds: TeamOdds) => {
        console.log(teamOdds);
        setTeamOddsSelected(teamOdds);
        props.setTeamOddsSelected(teamOdds);
    }

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
                                sx={{backgroundColor: teamOddsSelected?.team === teamOdds.team ? '#ededed' : '#ffffff'}}
                                onClick={() => handleTeamOddsSelected(teamOdds)}
                            >
                                <Grid item>
                                    <Typography sx={{fontWeight: teamOddsSelected?.team === teamOdds.team ? 'medium' : 'regular'}} textAlign="center">{teamOdds.team}</Typography>
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