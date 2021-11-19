import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import config from '../ormconfig';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User]), UsersModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
  exports: [AppService]
})
export class AppModule {}
