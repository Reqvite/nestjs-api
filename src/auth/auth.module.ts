import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './user.model';
import { AuthService } from './auth.service';
import { getJWTConfig } from 'src/configs/getJWTConfig';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
