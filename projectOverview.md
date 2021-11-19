# Brief notes on my NestJs task
## Index Flow
1. Explain work done on Decorators(with Guards).
2. DTO and Entity.
3. Pipes for transformation and validation.
4. Work done on Swagger with Authorize property.
5. Work on Docker to create application docker image and  running it as a containner on different routes.


# 1. Decorators:
 Picking an example from our project

```
1.  @ApiTags("Authentication")
2.  @UseGuards(LocalAuthGuard)
3.  @ApiOperation({summary:'Create JWT token for authentication by providing: username and password as JSON object.'})
4.  @Post('auth/login')
5.  async login(@Body() authDto:AuthDto,@Request() req){
6.    token =  this.authService.login(req.user);
7.    return token;
  }
```

- Line 1: Used in swagger for grouping this respecting endpoint to Authorization section.

- Line 2: Using Guard: Local AuthGuard runs local passport strategy thst takes username and password to validate user if user is present in the DB and with correct password.

- Line 3: Again just endpoint description for swagger. Will see in detail when come to swagger section.

- Line 4: Post() decorator to post required information. Here, we are giving just username and password of user.

- Line 5 : Returning a jwt access token.

- Workflow of line 4 and 5 : So, after passing from the guard we used( when username and password present in database, this guard will automatically runs the validate function we have implemented in local-strategy) we then only point to POST endpoint. Now, line 5: DTO has only 2 properties : username and password , guard uses that and then our validate function return all details of user except user password as REQ().

- Line 6 uses a function called logic() present in authservice in which we are generating jwt token.
    ```
    async login(user: any) {
        const payload = { ...user };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    ```

## Final Note on decorator:
We have used many decorated in order to make endpoints with required route. and implemented guards on all the endspoints. Used one more passport strategy in guard i.e., passport-jwt-strategy: that just checks in the generated jwt token information.
 


# 2. DTO and Entity

- Entity : Id, firstName, lastName, emailId, phoneNumber, city, state, country, password

- DTO: firstName, lastName, emailId, phoneNumber, city, state, country, password

- As we can see, in DTO there is no ID: it's auto incrementd.

- DTO: We use it in order insure that take inputs from json file in a correct and stuctured way as defined in DTO in order to push in into DataBase correctly.

- Acts as a data transfer object , trasfers object over the network.

# 3. Pipes
## CASE1. Transformation:

 ```
1. getUserById(@Param('id', ParseIntPipe) id:number){
2.        return this.userService.getOneById(id);
    }
    // THIS FUNCTION IS USED IN USER-CONTROLLER (check for reference)
```
- Line 1: Used ParseIntPipe because:
- as we search URL in search box say: localhhost:3000/1 ( .../1 is user's iD).
- So when we enter this, the whole request URL if of type string including the last id parameter:1.
- So we use ParseIntPipe that transform that dynamic value: id which is 1 and type of string to 1 of type number which is stored in database Id of type number.
- Overall: its tranforms id of type string to number, because in our database we have Id as number.

## Case2: Validation

- Used class-validator in DTO in order to validate if user is giving correct inputs.
```
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

```

- @IsString(), @IsNumber(), @IsEmail() : all these validates if user is giving inputs as required or not, if not then this will generate message in output to as guide to user to give correct inputs.

# 4. Work done on Swagger with Authorize property.

- Run application: npm run start
- goto: localhost:3000
- you will land on swagger.
- Created swagger with authorization, from that  we can create token and authorie all the endpoints from swagger itself.
- Properly documeted everything: Body type what every endpoints expecting to response type after excecution.
Allast properly mention the entity and STO used in application.
- Seperate section for authorization and User.

# 5. Work on Docker to create application docker image and  running it as a containner on different routes.

 
- Created this application's docker image. (reference: Dockerfile)
- Image run;s successfully in machine as a container.
- Every functionality works properly.
- Can run image on different routes.
- Hosted my UserManagementApi docker image in dockerhub repositry as public.
- To pull from docker image from dockerhub use cmd : docker pull sudarshanshukla/usermanagementapi