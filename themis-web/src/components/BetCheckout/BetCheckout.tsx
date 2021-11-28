import React from "react";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BetAmount } from "./BetAmount/BetAmount";
import { MatchDetails } from "./MatchDetails/MatchDetails";
import { BetExecution } from "./BetExecution/BetExecution";
import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { useWeb3ExecuteFunction } from "react-moralis";
import { CampaignContract } from "../../web3/campaign";
import { Match } from "../../interfaces/Match";
import { finalize, setError, submit } from "../../redux/actions/BetCheckoutActions";
import { Transaction } from "../../interfaces/Bet";

export interface BetCheckoutProps {
    match: Match | null;
    betCheckoutState: BetCheckoutState;
}

export function BetCheckout(props: BetCheckoutProps) {
    // Moralis hook
    const { fetch } = useWeb3ExecuteFunction();
    const [currentStep, setCurrentStep] = React.useState(0);
    if (props.match === null) {
        return (
            <></>
        );
    }
    const campaignContract = new CampaignContract(props.match.contractAddress);
    const steps = ['Select a side', 'Enter an amount', 'Submit bet'];
    const handleNext = () => {
        setCurrentStep((currentStep) => currentStep + 1);
    }
    const handleBack = () => {
        setCurrentStep((currentStep) => currentStep - 1);
    }

    const handleSubmit = () => {
        const teamId = props.betCheckoutState.bet.teamID;
        const amount = props.betCheckoutState.bet.bidAmount;
        submit();
        let contractTeamId: number = -1;
        if (props.match !== null) {
            if (props.match.home.team.ID === teamId) {
                contractTeamId = 0;
            } else if (props.match.away.team.ID === teamId) {
                contractTeamId = 1;
            } else if (props.match.tie.team.ID === teamId) {
                contractTeamId = 2;
            }
        }
        fetch({
            params: campaignContract.bid(contractTeamId.toString(), amount), 
            onError: error => setError(error.message),
            onSuccess: (transaction: any) => {
                finalize({
                    ...transaction,
                    contractAddress: campaignContract.contractAddress // TODO: ask Moralis dev team why contract address is null
                });
            }
        });
    }

    const renderStepperPage = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <MatchDetails
                        match={props.match!}
                        betCheckoutState={props.betCheckoutState}
                    />
                );
            case 1:
                return (
                    <BetAmount
                        match={props.match!}
                        betCheckoutState={props.betCheckoutState}
                    />
                );
            case 2:
                return (
                    <BetExecution
                        match={props.match!}
                        betCheckoutState={props.betCheckoutState}
                    />
                );
            default:
                return (
                    <Typography>Default</Typography>
                );
        }
    }

    return (
        <Box sx={{width: 500, height: 300, padding: 2}}>
            <Stepper activeStep={currentStep}>
                {
                    steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })
                }
            </Stepper>
            {
                renderStepperPage(currentStep)
            }
            {
                currentStep !== 0 && !props.betCheckoutState.finished &&
                <Button disabled={props.betCheckoutState.loading} onClick={handleBack}>Back</Button>
            }
            {
                currentStep < steps.length - 1 && 
                <Button onClick={handleNext}>Next</Button>
            }
            {
                currentStep === steps.length - 1 && !props.betCheckoutState.finished &&
                <Button disabled={props.betCheckoutState.loading} variant="contained" onClick={handleSubmit}>Submit</Button>
            }
        </Box>
    );
}