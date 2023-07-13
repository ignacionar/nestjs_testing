import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthorizedController } from './authorized.controller';
import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';

@Module({
  providers: [LoginService],
  controllers: [LoginController, AuthorizedController]
})
export class AuthorizedModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/authorized')
  }
}
