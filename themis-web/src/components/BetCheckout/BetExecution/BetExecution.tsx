import { Grid, Typography, CircularProgress, Link, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { BetCheckoutState } from "../../../interfaces/BetCheckoutState";
import { Match } from "../../../interfaces/Match";
import { getTeamOdds } from "../../../redux/selectors/TeamOddsSelectors";
import * as utils from '../../../utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface BetExecutionProp {
    match: Match;
    betCheckoutState: BetCheckoutState;
}

export function BetExecution(props: BetExecutionProp) {
    const selectedTeamOdds = getTeamOdds(props.betCheckoutState, props.match);

    let details = <Grid>
        <Typography>Please go back and make sure you filled everything correctly.</Typography>
    </Grid>;
    
    if (props.betCheckoutState.loading) {
        details = <CircularProgress/>
    } else if (props.betCheckoutState.finished) {
        details = <Grid>
            <Typography>
                Bet has been submitted. You can check out this 
                bet's status in <Link href="/bets">My Bets</Link> and
                you can verify on{' '}
                <Chip
                    label="Etherscan"
                    component="a"
                    href={`https://kovan.etherscan.io/tx/${props.betCheckoutState.transactionHash}`}
                    target="_blank"
                    icon={<OpenInNewIcon fontSize="small"/>}
                    clickable
                />.
            </Typography>
        </Grid>;
    } else if (selectedTeamOdds !== null) {
        details = <Grid container spacing={2}>
            <Grid item xs={12} sx={{margin: 2, marginLeft: 1, marginRight: 1}}>
                <Typography textAlign="center">
                    Please take a look at the following details before submitting.
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography textAlign="right">
                    {selectedTeamOdds.team.fullName} ({utils.otos(selectedTeamOdds.odds)})
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography textAlign="right">
                    {props.betCheckoutState.bidAmount} ETH
                </Typography>
            </Grid>
            {
                props.betCheckoutState.error &&
                <Grid item xs={12} sx={{margin: 2, marginLeft: 1, marginRight: 1}}>
                    <Typography textAlign="center">
                        There was an error so please retry.
                        {props.betCheckoutState.error}
                    </Typography>
                </Grid>
            }
        </Grid>
    }
    return (
        <Box sx={{padding: 2}}>
            { details }
        </Box>
    );
}