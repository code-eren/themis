import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matchID: number;

    @Column()
    awayTeamID: number;

    @Column()
    homeTeamID: number;

    @Column()
    awayTeamOdds: number;

    @Column()
    homeTeamOdds: number;

    @Column()
    address: string;
}