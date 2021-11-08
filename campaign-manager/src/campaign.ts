import {status} from 'server/reply';
import CampaignFactoryABI from './abi/CampaignFactory.json';
import {Contract, providers} from 'ethers';
import { getConnection } from './db';
import { Campaign } from './model/campaign';

const localAddr = "http://localhost:8545";
const testrpcprovider = new providers.JsonRpcProvider(localAddr);
const signer = testrpcprovider.getSigner(0);
const contract = new Contract(
    CampaignFactoryABI.networks[5777].address,
    CampaignFactoryABI.abi,
    signer
);

export interface CreateCampaignRequest {
    data: {
        matchID: string;
        awayTeamID: string;
        homeTeamID: string;
        awayOdds: number;
        homeOdds: number;
    };
}

export const createCampaign = async (ctx: CreateCampaignRequest) => {
    // should be admin endpoint
    let addr = await contract.createCampaign(
        ctx.data.matchID,
        ctx.data.awayTeamID,
        ctx.data.homeTeamID,
        ctx.data.awayOdds,
        ctx.data.homeOdds
    );
    getConnection().then((conn) => {
        let campaign = new Campaign();
        campaign.matchID = ctx.data.matchID;
        campaign.awayTeamID = ctx.data.awayTeamID;
        campaign.homeTeamID = ctx.data.homeTeamID;
        campaign.awayTeamOdds = ctx.data.awayOdds;
        campaign.homeTeamOdds = ctx.data.homeOdds;
        campaign.address = addr;
        conn.manager.save(campaign);
    });
    return status(200).json({
        addr
    });
}

export interface FetchCampaignsRequest {
    data: {
        count: number;
    }
}

export const fetchCampaigns = async (ctx: FetchCampaignsRequest) => {
    let campaigns = await getConnection().then((conn) => {
        let campaignRepo = conn.getRepository(Campaign);
        return campaignRepo.find({
            take: ctx.data.count
        });
    });
    return status(200).json({
        campaigns
    })
} 