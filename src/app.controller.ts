import { Body, Controller, Delete, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/AuthDto.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

var token;

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService:AuthService
    ) {}

    


  @ApiTags("Authentication")
  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary:'Create JWT token for authentication by providing: username and password as JSON object.'})
  @ApiOkResponse({ description:'Returns JWT token for endpoints authorization.'})
  @Post('auth/login')
  async login(@Body() authDto:AuthDto,@Request() req){
    token =  this.authService.login(req.user);
    return token;
  }



  @ApiTags("Authentication")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary:'Get User information on authorised token'})
  @ApiOkResponse({description:'Gives JWT token information '})
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req): any{
    return req.user;
  }


  
 
  
}
