import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  provider!: string; // 'google' or 'linkedin'
}
