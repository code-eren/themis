import { Match } from '../interfaces/Match';
import { GetCampaignsResponse, Campaign } from './responses';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3d59-38-122-226-212.ngrok.io/',
  timeout: 1000,
});

const defaultMatch: Match = {
  ID: "",
  away: {
    team: {
      ID: "",
      fullName: "",
      shortName: ""
    },
    odds: 0
  },
  home: {
    team: {
      ID: "",
      fullName: "",
      shortName: ""
    },
    odds: 0
  },
  tie: {
    team: {
      ID: "",
      fullName: "",
      shortName: ""
    },
    odds: 0
  },
  startTimestamp: new Date().getTime(),
  contractAddress: "",
  isKeeperRegistered: false
};

const checkHasNullProp = (camp: Campaign) => {
  return camp.Campaign_GameId === null ||
    camp.schedule_Timestamp === null ||
    camp.schedule_AwayTeamId === null ||
    camp.schedule_AwayTeamName === null || 
    camp.schedule_AwayTeamKey === null ||
    camp.schedule_AwayTeamMoneyLine === null ||
    camp.schedule_HomeTeamId === null ||
    camp.schedule_HomeTeamName === null ||
    camp.schedule_HomeTeamKey === null ||
    camp.schedule_HomeTeamMoneyLine === null ||
    camp.schedule_DrawMoneyLine === null ||
    camp.schedule_Timestamp === null ||
    camp.Campaign_DeployedAddress;
}

export const getMatches = () => {
  return axiosInstance.get<GetCampaignsResponse>('/campaigns').then(
    (res) => {
      const matches: Match[] = res.data.joinedCampaigns.map((camp) => {
        const timestampDate = camp.schedule_Timestamp === null ? new Date() : new Date(camp.schedule_Timestamp);
        const timestampMillis = timestampDate.getTime();
        return {
          ID: camp.Campaign_GameId?.toString() ?? "",
          away: {
            team: {
              ID: camp.schedule_AwayTeamId?.toString() ?? "",
              fullName: camp.schedule_AwayTeamName ?? "",
              shortName: camp.schedule_AwayTeamKey ?? ""
            },
            odds: camp.schedule_AwayTeamMoneyLine ?? 0
          },
          home: {
            team: {
              ID: camp.schedule_HomeTeamId?.toString() ?? "",
              fullName: camp.schedule_HomeTeamName ?? "",
              shortName: camp.schedule_HomeTeamKey ?? ""
            },
            odds: camp.schedule_HomeTeamMoneyLine ?? 0
          },
          tie: {
            team: {
              ID: "tieID",
              fullName: "tie",
              shortName: "TIE"
            },
            odds: camp.schedule_DrawMoneyLine ?? 0
          },
          startTimestamp: timestampMillis,
          contractAddress: camp.Campaign_DeployedAddress ?? "",
          isKeeperRegistered: camp.Campaign_KeeperAddress !== null, // TODO: fetch from campaignAddress
          rawCampaign: camp
        };
      }).filter(match => match.ID !== "");
      return matches;
    }
  );
}
