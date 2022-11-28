import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // {
    //   logger: ['error', 'debug','warn']
    // } 
    ); 
    app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 360000},
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(9000);
}
bootstrap();