import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BetAmount } from "./BetAmount/BetAmount";
import { MatchDetails } from "./MatchDetails/MatchDetails";
import { BetExecution } from "./BetExecution/BetExecution";
import { BetCheckoutState } from "../../interfaces/BetCheckoutState";
import { MatchesState } from "../../interfaces/MatchesState";
import { useWeb3ExecuteFunction } from "react-moralis";
import CampaignAbi from '../../abis/Campaign.json';
import { getMatch } from '../../redux/selectors/MatchSelectors';
import Moralis from 'moralis';
import { useMoralis } from 'react-moralis';

export interface BetCheckoutProps {
    matchesState: MatchesState;
    betCheckoutState: BetCheckoutState;
    onSelectSide: (selectedTeamID: string) => void;
    onEnterBid: (bidAmount: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    setLoading: (loading: boolean) => void;
}

export function BetCheckout(props: BetCheckoutProps) {
    const match = getMatch(props.betCheckoutState, props.matchesState);
    
    // Moralis hook
    const {data, error, fetch} = useWeb3ExecuteFunction({
        abi: CampaignAbi,
        contractAddress: "0x3856992b6C78fdBF97d9477cb614f97de81F6CB7",
        functionName: "bid",
        params: {
            _teamId: 1
        }
    });

    const bidOptions = (betCheckoutState: BetCheckoutState) => {
        console.log(match?.contractAddress)
        return {
            params: {
                abi: CampaignAbi,
                contractAddress: match?.contractAddress,
                functionName: "bid",
                params: {
                    _teamId: betCheckoutState.teamID
                },
                // // @ts-ignore:next-line
                // msgValue: Moralis.Units.ETH(betCheckoutState.bidAmount)
            },
            onError: console.log,
            onSuccess: console.log,
            onComplete: () => console.log("complete")
        };
    };
    
    const steps = ['Select a side', 'Enter an amount', 'Submit bet'];
    const [currentStep, setCurrentStep] = React.useState(0);
    const handleNext = () => {
        setCurrentStep((currentStep) => currentStep + 1);
    }
    const handleBack = () => {
        setCurrentStep((currentStep) => currentStep - 1);
    }
    const handleSubmit = async () => {
        fetch(bidOptions(props.betCheckoutState));
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
                        setLoading={props.setLoading}
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
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            }
        </Box>
    );
}