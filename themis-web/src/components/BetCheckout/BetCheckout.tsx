import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BetAmount } from "./BetAmount/BetAmount";
import { MatchDetails } from "./MatchDetails/MatchDetails";
import { BetExecution } from "./BetExecution/BetExecution";
import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { MatchesState } from "../../interfaces/MatchesState";

interface BetCheckoutProps {
    matchesState: MatchesState;
    betCheckoutState: BetCheckoutState;
    onSelectSide: (selectedTeamID: string) => void;
    onEnterBid: (bidAmount: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export function BetCheckout(props: BetCheckoutProps) {
    const steps = ['Select a side', 'Enter an amount', 'Submit bet'];
    const [currentStep, setCurrentStep] = React.useState(0);
    const handleNext = () => {
        setCurrentStep((currentStep) => currentStep + 1);
    }
    const handleBack = () => {
        setCurrentStep((currentStep) => currentStep - 1);
    }
    const renderStepperPage = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <MatchDetails
                        matchesState={props.matchesState}
                        betCheckoutState={props.betCheckoutState}
                        onSelectSide={props.onSelectSide}
                    />
                );
            case 1:
                return (
                    <BetAmount
                        matchesState={props.matchesState}
                        betCheckoutState={props.betCheckoutState}
                        onBidAmountEntered={props.onEnterBid}
                    />
                );
            case 2:
                return (
                    <BetExecution
                        matchesState={props.matchesState}
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
                currentStep !== 0 &&
                <Button onClick={handleBack}>Back</Button>
            }
            {
                currentStep < steps.length - 1 && 
                <Button onClick={handleNext}>Next</Button>
            }
            {
                currentStep === steps.length - 1 &&
                <Button variant="contained" onClick={props.onSubmit}>Submit</Button>
            }
        </Box>
    );
}