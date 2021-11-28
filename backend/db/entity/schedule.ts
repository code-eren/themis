import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  GameId: number;

  @Column({ nullable: true })
  RoundId: number;

  @Column({ nullable: true })
  Season: number;

  @Column({ nullable: true })
  SeasonType: number;

  @Column({ nullable: true })
  Group: string;

  @Column({ nullable: true })
  AwayTeamId: number;

  @Column({ nullable: true })
  HomeTeamId: number;

  @Column({ nullable: true })
  VenueId: number;

  @Column({ nullable: true })
  Day: string;

  @Column({ nullable: true })
  DateTime: string;

  @Column({ nullable: true })
  Status: string;

  @Column({ nullable: true })
  Week: number;

  @Column({ nullable: true })
  Period: string;

  @Column({ nullable: true })
  Clock: string;

  @Column({ nullable: true })
  Winner: string;

  @Column({ nullable: true })
  VenueType: string;

  @Column({ nullable: true })
  AwayTeamKey: string;

  @Column({ nullable: true })
  AwayTeamName: string;

  @Column({ nullable: true })
  AwayTeamCountryCode: string;

  @Column({ nullable: true })
  AwayTeamScore: number;

  @Column({ nullable: true })
  AwayTeamScorePeriod1: number;

  @Column({ nullable: true })
  AwayTeamScorePeriod2: number;

  @Column({ nullable: true })
  AwayTeamScoreExtraTime: number;

  @Column({ nullable: true })
  AwayTeamScorePenalty: number;

  @Column({ nullable: true })
  HomeTeamKey: string;

  @Column({ nullable: true })
  HomeTeamName: string;

  @Column({ nullable: true })
  HomeTeamCountryCode: string;

  @Column({ nullable: true })
  HomeTeamScore: number;

  @Column({ nullable: true })
  HomeTeamScorePeriod1: number;

  @Column({ nullable: true })
  HomeTeamScorePeriod2: number;

  @Column({ nullable: true })
  HomeTeamScoreExtraTime: number;

  @Column({ nullable: true })
  HomeTeamScorePenalty: number;

  @Column({ nullable: true })
  HomeTeamMoneyLine: number;

  @Column({ nullable: true })
  AwayTeamMoneyLine: number;

  @Column({ nullable: true })
  DrawMoneyLine: number;

  @Column({ nullable: true })
  PointSpread: number;

  @Column({ nullable: true })
  HomeTeamPointSpreadPayout: number;

  @Column({ nullable: true })
  AwayTeamPointSpreadPayout: number;

  @Column({ nullable: true })
  OverUnder: number;

  @Column({ nullable: true })
  OverPayout: number;

  @Column({ nullable: true })
  UnderPayout: number;

  @Column({ nullable: true })
  Attendance: number;

  @Column({ nullable: true })
  Updated: string;

  @Column({ nullable: true })
  UpdatedUtc: string;

  @Column({ nullable: true })
  GlobalGameId: number;

  @Column({ nullable: true })
  GlobalAwayTeamId: number;

  @Column({ nullable: true })
  GlobalHomeTeamId: number;

  @Column({ nullable: true })
  ClockExtra: number;

  @Column({ nullable: true })
  ClockDisplay: string;

  @Column({ nullable: true })
  IsClosed: boolean;

  @Column({ nullable: true })
  HomeTeamFormation: string;

  @Column({ nullable: true })
  AwayTeamFormation: string;

  @Column({ nullable: true })
  PlayoffAggregateScore: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: string;
}
