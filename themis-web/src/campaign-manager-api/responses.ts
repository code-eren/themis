// reponse for GET /campaigns
export interface GetCampaignsResponse {
    joinedCampaigns: Campaign[];
}

// campaign and match are synonymous
interface Campaign {
    Campaign_Id: number;
    Campaign_DeployedAddress: string;
    Campaign_OracleAddress: string;
    Campaign_KeeperAddress: string;
    Campaign_GameId: number;
    Campaign_ScheduleId: number;
    Campaign_Timestamp: string;
    schedule_Id: number;
    schedule_GameId: number;
    schedule_RoundId: number;
    schedule_Season: number;
    schedule_SeasonType: number;
    schedule_Group: string;
    schedule_AwayTeamId: number;
    schedule_HomeTeamId: number;
    schedule_VenueId: number;
    schedule_Day: string;
    schedule_DateTime: string;
    schedule_Status: string;
    schedule_Week: number;
    schedule_Period: string;
    schedule_Clock: string;
    schedule_Winner: string;
    schedule_VenueType: string;
    schedule_AwayTeamKey: string;
    schedule_AwayTeamName: string;
    schedule_AwayTeamCountryCode: string;
    schedule_AwayTeamScore: number;
    schedule_AwayTeamScorePeriod1: number;
    schedule_AwayTeamScorePeriod2: number;
    schedule_AwayTeamScoreExtraTime: string;
    schedule_AwayTeamScorePenalty: string;
    schedule_HomeTeamKey: string;
    schedule_HomeTeamName: string;
    schedule_HomeTeamCountryCode: string;
    schedule_HomeTeamScore: number;
    schedule_HomeTeamScorePeriod1: number;
    schedule_HomeTeamScorePeriod2: number;
    schedule_HomeTeamScoreExtraTime: string;
    schedule_HomeTeamScorePenalty: string;
    schedule_HomeTeamMoneyLine: number;
    schedule_AwayTeamMoneyLine: number;
    schedule_DrawMoneyLine: number;
    schedule_PointSpread: number;
    schedule_HomeTeamPointSpreadPayout: number;
    schedule_AwayTeamPointSpreadPayout: number;
    schedule_OverUnder: string;
    schedule_OverPayout: number;
    schedule_UnderPayout: number;
    schedule_Attendance: string;
    schedule_Updated: string;
    schedule_UpdatedUtc: string;
    schedule_GlobalGameId: number;
    schedule_GlobalAwayTeamId: number;
    schedule_GlobalHomeTeamId: number;
    schedule_ClockExtra: string;
    schedule_ClockDisplay: string;
    schedule_IsClosed: number;
    schedule_HomeTeamFormation: string;
    schedule_AwayTeamFormation: string;
    schedule_PlayoffAggregateScore: string;
    schedule_Timestamp: string;
}