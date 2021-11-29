import { finalize, setError } from './../redux/actions/BetCheckoutActions';
import { update } from './../redux/actions/CampaignContractsActions';
import { Moralis } from 'moralis';
import Campaign from '../abis/Campaign.json';
import Campaignv2 from '../abis/Campaignv2.json';
import Campaignv3 from '../abis/Campaignv3.json';
import { Contract } from './moralis-wrapper';

interface MoralisFetchParams {
    params: {
        abi: Object;
        contractAddress: string;
        functionName: string;
        params?: any,
        msgValue?: string | number
    };
    onSuccess: (data: unknown) => void;
    onError: (error: any) => void;
}

const CONTRACT_TYPE_ERROR = "smart contract type error";

export class CampaignContract extends Contract {
    constructor(contractAddress: string) {
        const campaign: any = Campaignv3;
        super(campaign["abi"], contractAddress);
    }

    bidParams(_teamId: number, amount: string): MoralisFetchParams {
        return {
            params: {
                ...this.metadata(),
                functionName: "bid",
                params: {
                    _teamId: _teamId,
                },
                msgValue: Moralis.Units.ETH(amount)
            },
            onSuccess: (transaction: any) => {
                finalize({
                    ...transaction,
                    contractAddress: this.contractAddress
                })
            },
            onError: (error: any) => setError(error["message"])
        };
    }

    betterBid(amount: string, fromAddr: string) {
        return {
            from: fromAddr,
            to: this.contractAddress,
            value: Moralis.Units.ETH(amount),
            gas: 50000000
            // gasPrice: Moralis.Units.ETH("0.03"),
            // gasLimit: Moralis.Units.ETH("0.03"),
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
            onError: (error: any) => {
                this._updateIsFulfilledProperty(false, error["message"]);
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
                if (typeof winner === "number") {
                    this._updateWinnerTeamIdProperty(false, "", winner.toString());
                } else {
                    this._updateWinnerTeamIdProperty(false, CONTRACT_TYPE_ERROR);
                }
            },
            onError: (error: any) => {
                this._updateWinnerTeamIdProperty(false, error["message"])
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

    addressToBidderParams(addr: string): MoralisFetchParams {
        // set loading to true before contract calls and when complete set to false
        this._updateAddressToBidderProperty(true, "");
        return {
            params: {
                ...this.metadata(),
                functionName: "addr2bidder",
                params: {
                    input: addr
                }
            },
            onSuccess: (data: unknown) => {
                console.log(data)
                this._updateAddressToBidderProperty(false, "", data);
            },
            onError: (error: any) => {
                console.log(error)
                this._updateAddressToBidderProperty(false, error["message"])
            } 
        }
    }

    _updateAddressToBidderProperty(loading: boolean, error: string, addressToBidder?: any) {
        update([{
            contractAddress: this.contractAddress,
            addressToBidder: {
                value: addressToBidder,
                status: {
                    loading,
                    error
                }
            }
        }]);
    }

    allPropsParams(addr: string) {
        return [
            this.isFulfilledParams(),
            this.addressToBidderParams(addr),
            this.winnerParams(),
        ];
    }
}
