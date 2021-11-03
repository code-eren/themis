import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TeamOdds, convertOddsToString } from "../../../interfaces/TeamOdds";

interface BetAmountProps {
    teamOddsSelected: TeamOdds | null;
    amount: string | null;
    setAmount: (amount: string | null) => void; 
}

export function BetAmount (props: BetAmountProps) {
    const [amount, setAmount] = React.useState<string|null>(props.amount);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
        props.setAmount(event.target.value);
    };
    const getWinnings = (amountParsed: number, odds: number): number => {
        if (odds < 0) {
            return -amountParsed/odds*100;
        } else {
            return amountParsed*odds/100;
        }
    }

    const renderAmountWinningsMessage = (teamOdds: TeamOdds, amountAsString: string) => {
        let amountParsed = parseFloat(amountAsString);
        if (isNaN(amountParsed)) {
            return <Typography textAlign="center">Please enter a decimal.</Typography>;
        } else if (amountParsed <= 0) {
            return <Typography textAlign="center">Only positive amounts please!</Typography>
        } else {
            let team = teamOdds.team === "Tie" ? "a tie" : teamOdds.team;
            let odds = convertOddsToString(teamOdds.odds);
            let winnings = getWinnings(amountParsed, teamOdds.odds);
            console.log(winnings);
            let message = `Since you bet on ${team} (${odds}), your winnings would be ${winnings} ETH.`;
            return <Typography textAlign="center">{message}</Typography>;
        }
    }
    return (
        <Box sx={{padding: 2}}>
            {
                props.teamOddsSelected === null ?
                <Typography textAlign="center">Please go back and select a side.</Typography> :
                <Grid container>
                    <Grid xs={12} sx={{margin: 2}}>
                        <Typography textAlign="center">
                            Please enter the amount you would like to bet.
                        </Typography>
                    </Grid>
                    <Grid xs={12} textAlign="center" sx={{margin: 3}}>
                        <TextField
                            value={amount}
                            onChange={handleAmountChange}
                            label="Amount"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">ETH</InputAdornment>
                            }}
                        />
                    </Grid>
                    <Grid xs={12}>
                        {
                            amount && renderAmountWinningsMessage(props.teamOddsSelected, amount)
                        }
                    </Grid>
                </Grid>
            }
        </Box>
    );
}