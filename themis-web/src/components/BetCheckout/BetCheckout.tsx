import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Bet } from "../../interfaces/Bet";
import { BetCheckoutForm } from "../../interfaces/BetCheckoutForm";
import { TeamOdds } from "../../interfaces/TeamOdds";
import { storeBet } from "../../storage/BetStorage";
import { BetAmount } from "../BetAmount/BetAmount";
import { BetDetails } from "../BetDetails/BetDetails";
import { BetExecution } from "../BetExecution/BetExecution";

interface BetCheckoutProps {
    betToBuy: Bet;
}

export function BetCheckout(props: BetCheckoutProps) {
    const steps = ['Select a side', 'Enter an amount', 'Submit bet'];
    const [currentStep, setCurrentStep] = React.useState(0);
    const [betCheckoutForm, setBetCheckoutForm] = React.useState<BetCheckoutForm>({
        teamOddsSelected: null,
        amountToBet: null
    })
    const handleNext = () => {
        setCurrentStep((currentStep) => currentStep + 1);
    }
    const handleBack = () => {
        setCurrentStep((currentStep) => currentStep - 1);
    }

    const handleSubmit = () => {
        storeBet(props.betToBuy, betCheckoutForm);
    }
    const handleSelectTeamOddsSelected = (teamOddsSelected: TeamOdds) => {
        setBetCheckoutForm((prevBetCheckoutForm: BetCheckoutForm) => {
            return {
                ...prevBetCheckoutForm,
                teamOddsSelected
            }
        })
    }

    const handleAmountSet = (amountToBet: string | null) => {
        setBetCheckoutForm((prevBetCheckoutForm: BetCheckoutForm) => {
            return {
                ...prevBetCheckoutForm,
                amountToBet
            }
        })
    }

    const renderStepperPage = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <BetDetails bet={props.betToBuy} teamOddsSelected={betCheckoutForm.teamOddsSelected} setTeamOddsSelected={handleSelectTeamOddsSelected} />
                );
            case 1:
                return (
                    <BetAmount teamOddsSelected={betCheckoutForm.teamOddsSelected} amount={betCheckoutForm.amountToBet} setAmount={handleAmountSet} />
                );
            case 2:
                return (
                    <BetExecution betCheckoutForm={betCheckoutForm} />
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
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            }
        </Box>
    );
}