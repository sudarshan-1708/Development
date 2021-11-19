import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from './customDecorator/publicAuth.decorator';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService) {}


    /**
     * @description Route: http:localhost:3000/users. Gets all the users information present in the database
     * @returns [userName:string,lastname:string,emailId:string,phoneNumber:number,city:string,state:string,country:string,password:string]
     * @example {
     * id: 1,firstName: Sudarshan, lastName:Shukla, emailId:sudarshan@gmail.com, phoneNumber: 9369426294, city:Pratapgarh,state:Uttar Pradesh, country:India,password:changeme
     * }
     */
     @UseGuards(AuthGuard('jwt'))
    @ApiOperation({summary:'Gets all user data present in DataBase'})
    @ApiOkResponse({type:User, isArray: true, description :'Fetch all users present in DataBase'})
    @Get()
    @ApiBearerAuth()
    getUsers(): Promise<User[]> {
        return this.userService.getAll();
    }


    /**
     * @description Route (GET) users/{:id}. Gives the user date with given user Id.
     * @param id 
     * @returns [id:number,userName:string,lastname:string,emailId:string,phoneNumber:number,city:string,state:string,country:string,password:string]
     * @example http://localhost:3000/user/1
     * {
     * id: 1,firstName: Sudarshan, lastName:Shukla, emailId:sudarshan@gmail.com, phoneNumber: 9369426294, city:Pratapgarh,state:Uttar Pradesh, country:India,password:changeme
     * }
     */
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({summary:'Get User information by their id',parameters:[]})
    @ApiOkResponse({type:User, description:'Get user information respective to their id'})
    @Get(':id')
    @ApiBearerAuth()
    getUserById(@Param('id', ParseIntPipe) id:number){
        return this.userService.getOneById(id);
    }


    /**
     * @description Route: localhost:3000/users , Request: POST
     * @requires Requires user DTO -->  [firstName:string, lastName:string, emailId:string, phoneNumber:number, city:string, state:string, country:string, password:string]]
     * @description Adds a new User in DataBase, Takes UserDto (*given in param section)
     * @param UserDTO : Defines the data trafer object's property to flow on network --> [firstName:string, lastName:string, emailId:string, phoneNumber:number, city:string, state:string, country:string, password:string]
     * @return UserEnitity with: [firstname,lastName,emailId,city,state,country,password --> String , phoneNumber -->number and self-generatedId --> number ]
     * @example {
     * firstName: "Sudarshan", lastName:"Shukla", emailId:"sudarshan@gmail.com", phoneNumber: 9369426294, city:"Pratapgarh",state:"Uttar Pradesh", country:"India",password:"changeme"
     * }
     */
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({type : User, description:'Add new user to DataBase with respective DTO and autoIncrementing ID'})
    @ApiOperation({summary:'Add user to dataBase with described DTO as references below in schema section'})
    @Post()
    @ApiBearerAuth()
    create(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
    }

    /**
     * @description Route: (@PUT) user/1 . Update user information on respective userId according to given information on DTO properties
     * @param id User id -> where we have to update user information
     * @param user userDto -> to update user properties on database
     * @returns UserEnitity with: [id:number,firstname,lastName,emailId,city,state,country,password --> String , phoneNumber -->number and self-generatedId --> number ]
     * @example http://localhost:3000/user/1
     * {
     * id: 1,firstName: Sudarshan, lastName:Shukla, emailId:sudarshan@gmail.com, phoneNumber: 9369426294, city:Pratapgarh,state:Uttar Pradesh, country:India,password:changeme
     * }
     */
     @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({type:User, description:'Update user with respective Id'})
    @ApiOperation({summary:"Update user by providing user's Id and information as per DTO properties. Information will be updated on respected user id."})
    @Put(':id')
    @ApiBearerAuth()
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UserDto) {
    return this.userService.updateInfoOfUser(id,user);
    }

    /**
     * @description Route: (Delete) users. Removes user from the dataBase with given Id
     * @param id 
     */
     @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse({type:User, description:'Remove user with respective Id'})
    @ApiOperation({summary:'Delete user form database with respective user id.'})
    @Delete(':id')
    @ApiBearerAuth()
    delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteOneUser(id);
    }

}