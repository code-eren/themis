// everything that can be read from campaign contract
export interface CampaignContractProperties {
    // these are required
    contractAddress: string;

    // these are retrieved from smart contract
    matchId: {
        value?: string;
        status: PropertyStatus;
    }; // gameId
    awayScore: {
        value?: number;
        status: PropertyStatus;
    }; //awayScore
    homeScore: {
        value?: number;
        status: PropertyStatus;
    }; // homescore
    isFulfilled: {
        value?: boolean;
        status: PropertyStatus;
    }; // fulfilled
    chainlinkToken: {
        value?: string;
        status: PropertyStatus;
    }; // getChainlinkToken
    homeOdds: {
        value?: number;
        status: PropertyStatus;
    }; // odds0
    awayOdds: {
        value?: number;
        status: PropertyStatus;
    }; // odds1
    drawOdds: {
        value?: number;
        status: PropertyStatus;
    }; // oddsDraw
    homeTeamId: {
        value?: string;
        status: PropertyStatus;
    }; // teamId0
    awayTeamId: {
        value?: string;
        status: PropertyStatus;
    }; // teamId1
    winnerTeamId: {
        value?: string;
        status: PropertyStatus;
    }; // winnedTeamId
    addressToBidder: {
        value?: any;
        status: PropertyStatus;
    } // addr2bidder
}


// same as above but any given property is optional
export interface OptionalCampaignContractProperties {
    // these are required
    contractAddress: string;

    // these are retrieved from smart contract
    matchId?: {
        value?: string;
        status: PropertyStatus;
    }; // gameId
    awayScore?: {
        value?: number;
        status: PropertyStatus;
    }; //awayScore
    homeScore?: {
        value?: number;
        status: PropertyStatus;
    }; // homescore
    isFulfilled?: {
        value?: boolean;
        status: PropertyStatus;
    }; // fulfilled
    chainlinkToken?: {
        value?: string;
        status: PropertyStatus;
    }; // getChainlinkToken
    homeOdds?: {
        value?: number;
        status: PropertyStatus;
    }; // odds0
    awayOdds?: {
        value?: number;
        status: PropertyStatus;
    }; // odds1
    drawOdds?: {
        value?: number;
        status: PropertyStatus;
    }; // oddsDraw
    homeTeamId?: {
        value?: string;
        status: PropertyStatus;
    }; // teamId0
    awayTeamId?: {
        value?: string;
        status: PropertyStatus;
    }; // teamId1
    winnerTeamId?: {
        value?: string;
        status: PropertyStatus;
    }; // winnedTeamId
    addressToBidder?: {
        value?: any;
        status: PropertyStatus;
    } // addr2bidder
}
export interface PropertyStatus {
    loading: boolean; // insert loading if value is loading
    error: string; // empty if no error
}