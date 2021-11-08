import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    matchID: string;

    @Column()
    awayTeamID: string;

    @Column()
    homeTeamID: string;

    @Column()
    awayTeamOdds: number;

    @Column()
    homeTeamOdds: number;

    @Column()
    address: string;
}