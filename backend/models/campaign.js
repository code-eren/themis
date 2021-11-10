const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
class RawCampaignData {
    @PrimaryGeneratedColumn("number")
    Id;
    
    @Column()
    GameId;
    
    @Column()
    RoundId;
    
    @Column()
    Season;
    
    @Column()
    SeasonType;
    
    @Column()
    Group;
    
    @Column()
    AwayTeamId;
    
    @Column()
    HomeTeamId;
    
    @Column()
    VenueId;
    
    @Column()
    Day;
    
    @Column()
    DateTime;
    
    @Column()
    Status;
    
    @Column()
    Week;
    
    @Column()
    Period;
    
    @Column()
    Clock;
    
    @Column()
    Winner;
    
    @Column()
    VenueType;
    
    @Column()
    AwayTeamKey;
    
    @Column()
    AwayTeamName;
    
    @Column()
    AwayTeamCountryCode;
    
    @Column()
    AwayTeamScore;
    
    @Column()
    AwayTeamScorePeriod1;
    
    @Column()
    AwayTeamScorePeriod2;
    
    @Column()
    AwayTeamScoreExtraTime;
    
    @Column()
    AwayTeamScorePenalty;
    
    @Column()
    HomeTeamKey;
    
    @Column()
    HomeTeamName;
    
    @Column()
    HomeTeamCountryCode;
    
    @Column()
    HomeTeamScore;
    
    @Column()
    HomeTeamScorePeriod1;
    
    @Column()
    HomeTeamScorePeriod2;
    
    @Column()
    HomeTeamScoreExtraTime;
    
    @Column()
    HomeTeamScorePenalty;
    
    @Column()
    HomeTeamMoneyLine;
    
    @Column()
    AwayTeamMoneyLine;
    
    @Column()
    DrawMoneyLine;
    
    @Column()
    PointSpread;
    
    @Column()
    HomeTeamPointSpreadPayout;
    
    @Column()
    AwayTeamPointSpreadPayout;
    
    @Column()
    OverUnder;
    
    @Column()
    OverPayout;
    
    @Column()
    UnderPayout;
    
    @Column()
    Attendance;
    
    @Column()
    Updated;
    
    @Column()
    UpdatedUtc;
    
    @Column()
    GlobalGameId;
    
    @Column()
    GlobalAwayTeamId;
    
    @Column()
    GlobalHomeTeamId;
    
    @Column()
    ClockExtra;
    
    @Column()
    ClockDisplay;
    
    @Column()
    IsClosed;
    
    @Column()
    HomeTeamFormation;
    
    @Column()
    AwayTeamFormation;
    
    @Column()
    PlayoffAggregateScore;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    Timestamp;

    @Column()
    Address;
}

module.exports = {Campaign};