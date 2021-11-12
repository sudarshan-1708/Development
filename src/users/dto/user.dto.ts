import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserDto{

    @ApiProperty()
    @IsString()
    firstName : string;

    @ApiProperty()
    @IsString()
    lastName : string;

    @ApiProperty({"required":false})
    @IsEmail()
    emailId : string;

    @ApiProperty()
    @IsNumber()
    phoneNumber : number;

    @ApiProperty()
    @IsString()
    city : string;

    @ApiProperty()
    @IsString()
    state : string;

    @ApiProperty()
    @IsString()
    country : string;

    @ApiProperty()
    @IsString()
    password : string;

    
}