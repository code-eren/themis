import { update } from './../redux/actions/CampaignContractsActions';
import { Moralis } from 'moralis';
import Campaign from '../abis/Campaign.json';
import { Contract } from './moralis-wrapper';

interface MoralisFetchParams {
    params: {
        abi: Object;
        contractAddress: string;
        functionName: string;
    };
    onSuccess: (data: unknown) => void;
    onError: (error: any) => void;
}

const CONTRACT_TYPE_ERROR = "smart contract type error";

export class CampaignContract extends Contract {
    constructor(contractAddress: string) {
        super(Campaign.abi, contractAddress);
    }

    bid(_teamId: string, amount: string) {
        return {
            ...this.metadata(),
            functionName: "bid",
            params: {
                _teamId,
            },
            msgValue: Moralis.Units.ETH(amount)
        };
    }

    claimParams() {
        return {
            params: {
                ...this.metadata(),
                functionName: "claim"
            },
            onSuccess: console.log,
            onError: console.log
        };
    }

    isFulfilledParams(): MoralisFetchParams {
        return {
            params: {
                ...this.metadata(),
                functionName: "fulfilled"
            },
            onSuccess: (isFulfilled: unknown) => {
                if (typeof isFulfilled === "boolean") {
                    this._updateIsFulfilledProperty(false, "", isFulfilled);
                } else {
                    this._updateIsFulfilledProperty(false, CONTRACT_TYPE_ERROR);
                }
            },
            onError: (error: unknown) => {
                console.log(error);
                this._updateIsFulfilledProperty(false, JSON.stringify(error));
            }
        };
    }

    _updateIsFulfilledProperty(loading: boolean, error: string, isFulfilled?: boolean) {
        update([{
            contractAddress: this.contractAddress,
            isFulfilled: {
                value: isFulfilled,
                status: {
                    loading,
                    error
                }
            }
        }])
    }

    winnerParams(): MoralisFetchParams {
        // set loading to true before contract calls and when complete set to false
        this._updateWinnerTeamIdProperty(true, "");
        return {
            params: {
                ...this.metadata(),
                functionName: "winnedTeamId"
            },
            onSuccess: (winner: unknown) => {
                console.log("success")
                if (typeof winner === "number") {
                    this._updateWinnerTeamIdProperty(false, "", winner.toString());
                } else {
                    this._updateWinnerTeamIdProperty(false, CONTRACT_TYPE_ERROR);
                }
            },
            onError: (error: any) => {
                console.log(error);
                this._updateWinnerTeamIdProperty(false, error.message)
            } 
        }
    }

    _updateWinnerTeamIdProperty(loading: boolean, error: string, winnerTeamId?: string) {
        update([{
            contractAddress: this.contractAddress,
            winnerTeamId: {
                value: winnerTeamId,
                status: {
                    loading,
                    error
                }
            }
        }]);
    }
}
