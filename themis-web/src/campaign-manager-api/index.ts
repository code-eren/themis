import { Match } from './../interfaces/Match';
import { GetCampaignsResponse } from './responses';
import { setLoading } from '../redux/actions/BetCheckoutActions';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://c6c2-38-122-226-212.ngrok.io/',
  timeout: 1000,
});

export const submitBet = (betCheckoutState: BetCheckoutState) => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
};

export const getMatches = () => {
  return axiosInstance.get<GetCampaignsResponse>('/campaigns').then(
    (res) => {
      const matches: Match[] = res.data.joinedCampaigns.map((camp) => {
        // convert Campaign => Match
        const timestampDate = new Date(camp.schedule_Timestamp);
        const timestampMillis = timestampDate.getTime();
        return {
          ID: camp.Campaign_Id.toString(),
            away: {
              team: {
                ID: camp.schedule_AwayTeamId.toString(),
                fullName: camp.schedule_AwayTeamName,
                shortName: camp.schedule_AwayTeamKey
              },
              odds: camp.schedule_AwayTeamMoneyLine
            },
            home: {
              team: {
                ID: camp.schedule_HomeTeamId.toString(),
                fullName: camp.schedule_HomeTeamName,
                shortName: camp.schedule_HomeTeamKey
              },
              odds: camp.schedule_HomeTeamMoneyLine
            },
            tie: {
              team: {
                ID: "tie",
                fullName: "tie",
                shortName: "TIE"
              },
              odds: camp.schedule_DrawMoneyLine
            },
            startTimestamp: timestampMillis
        };
      });
      return matches;
    }
  );
}