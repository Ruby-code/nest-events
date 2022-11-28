import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppDummy } from './app.dummy';
import { AppJapanService } from './app.japan.service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/localStrategy';
import { User } from './auth/user.entity';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
// import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV != 'production' 
      ? ormConfig: ormConfigProd
    }),
    TypeOrmModule.forFeature([User]),
AuthModule,
EventsModule,
JwtModule.registerAsync({
  useFactory: () => ({
    // secret: process.env.AUTH_SECRET,
    secret: "secret123",
    signOptions:{
      expiresIn: '1000s'
    }
  })
})
],
  controllers: [AppController],
   //Standard Provider  [AppService]
  providers:  [AppService, LocalStrategy,AuthService]
//   providers: [
//    //Custom Class Provider
//   {
//     provide: AppService,
//     useClass: AppJapanService
//   },
//   //Custom Value Provider
//   {
//     provide: 'APP_NAME',
//     useValue: 'NEST EVENTS BACKEND!'
//   },
// //Factory Provider
// {
//   provide: 'MESSAGE',
//   inject: [AppDummy],
//   useFactory: (app) => `${app.dummy()} Factory!`
// }, AppDummy
// ],
})
export class AppModule {}


//npm install --save @nestjs/typeorm typeorm mysql
// npm install --save @nestjs/passport passport passport-local
// npm i --save-dev @types/passport-local
// npm i bcrypt
// npm i -d @types/bcrypt
//npm install --save @nestjs/jwt passport-jwt 
//npm install --save-dev @types/passport-jwt
//npm i --save @nestjs/config
