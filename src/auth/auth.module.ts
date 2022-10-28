import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuardJwt } from "./auth-guard.jwt";
import { AuthGuardLocal } from "./auth-guard.local";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./localStrategy";
import { User } from "./user.entity";
import { UsersController } from "./users.controllers";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory:async (configService: ConfigService) => ({
    //     secret: process.env.AUTH_SERVICE,
    //     signOptions:{
    //       expiresIn: '1000s',
    //     }
    //   })
    
    // })
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        // secret: "secret123",
        signOptions:{
          expiresIn: '1000s'
        }
      })
    })
],
    providers: [LocalStrategy,JwtStrategy,AuthService, AuthGuardJwt, AuthGuardLocal],
    controllers:[AuthController, UsersController]
})
export class AuthModule{}
