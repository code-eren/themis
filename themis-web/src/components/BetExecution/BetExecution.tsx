import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BetCheckoutForm } from "../../interfaces/BetCheckoutForm";
import { convertOddsToString } from "../../interfaces/TeamOdds";

interface BetExecutionProp {
    betCheckoutForm: BetCheckoutForm;
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
    return (
        <Box sx={{padding: 2}}>
            {
                props.betCheckoutForm.amountToBet && props.betCheckoutForm.teamOddsSelected ?
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{margin: 2, marginLeft: 1, marginRight: 1}}>
                        <Typography textAlign="center">
                            Please take a look at the following details before submitting.
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="right">
                            {props.betCheckoutForm.teamOddsSelected?.team} ({convertOddsToString(props.betCheckoutForm.teamOddsSelected?.odds)})
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography textAlign="right">
                            {props.betCheckoutForm.amountToBet} ETH
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
                            {sumOfEthCosts([props.betCheckoutForm.amountToBet, gasCosts])} ETH
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