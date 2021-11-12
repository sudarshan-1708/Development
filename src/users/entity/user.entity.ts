import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;

    @ApiProperty()
    @Column()
    firstName : string;

    @ApiProperty()
    @Column()
    lastName : string;

    @ApiProperty()
    @Column()
    emailId : string;

    @ApiProperty()
    @Column()
    phoneNumber : number;

    @ApiProperty()
    @Column()
    city : string;

    @ApiProperty()
    @Column()
    state : string;

    @ApiProperty()
    @Column()
    country : string;

    @ApiProperty()
    @Column()
    password : string;

    
}