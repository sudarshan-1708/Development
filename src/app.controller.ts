import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/AuthDto.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './users/customDecorator/publicAuth.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService:AuthService
    ) {}


  @ApiTags("Authentication")
  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary:'Create JWT token for authentication by providing: username and password as JSON object.'})
  @Post('auth/login')
  async login(@Body() authDto:AuthDto,@Request() req){
    return this.authService.login(req.user);
  }



  @ApiTags("Authentication")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary:'Get User information on authorised token'})
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req): any{
    return req.user;
  }
 
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
