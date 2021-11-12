import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  DeployedAddress: string;

  @Column()
  OracleAddress: string;

  @Column({ nullable: true })
  KeeperAddress: string;

  @Column()
  GameId: number;

  @Column()
  ScheduleId: number; //foreign key

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: string;
}
