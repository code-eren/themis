import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BetCheckoutState } from "../../../interfaces/BetCheckoutState";
import { MatchesState } from "../../../interfaces/MatchesState";
import { getTeamOdds } from "../../../redux/selectors/TeamOddsSelectors";
import * as utils from '../../../utils';

interface BetExecutionProp {
    betCheckoutState: BetCheckoutState;
    matchesState: MatchesState;
    setLoading: (loading: boolean) => void;
}

export function BetExecution(props: BetExecutionProp) {
    const sumOfEthCosts = (stringCosts: string[]): string => {
        let init = 0;
        for (let i = 0; i < stringCosts.length; i++) {
            let cost = parseFloat(stringCosts[i]);
            if (!isNaN(cost) && cost >= 0) {
                init += cost;
            }
        }
        return init.toString();
    }
    const gasCosts = "1.0";
    const selectedTeamOdds = getTeamOdds(props.betCheckoutState, props.matchesState);
    return (
        <Box sx={{padding: 2}}>
            {
                selectedTeamOdds !== null ?
                <Grid container spacing={2}>
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
                    <Grid item xs={5}>
                        <Typography textAlign="right">
                            Gas Fee
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="right">
                            {gasCosts} ETH
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="right" sx={{fontWeight: "bold"}}>
                            Total
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="right" sx={{fontWeight: "bold"}}>
                            {sumOfEthCosts([props.betCheckoutState.bidAmount, gasCosts])} ETH
                        </Typography>
                    </Grid>
                </Grid> :
                <Grid>
                    <Typography>Please go back and make sure you filled everything correctly.</Typography>
                </Grid>
            }
        </Box>
    );
}