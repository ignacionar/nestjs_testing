import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './product/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HelloMiddleware } from './middlewares/hello.middleware';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bull';
import { MessageModule } from './message/message.module';
import { FileModule } from './file/file.module';
import { AuthorizedModule } from './authorized/authorized.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedismicroserviceController } from './redismicroservice/redismicroservice.controller';
import { RedismicroserviceService } from './redismicroservice/redismicroservice.service';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'NUMBER_SERVICE',
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379
      }
    }]),
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          // ttl: 10
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
    ProductModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (service: ConfigService) => ({
        redis: {
          host: service.get('REDIS_HOST'),
          port: service.get('REDIS_PORT')
        }
      }),
    }),
    MessageModule,
    FileModule,
    AuthorizedModule,
  ],
  providers: [AppService, LoginService, RedismicroserviceService],
  controllers: [AppController, LoginController, RedismicroserviceController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelloMiddleware).forRoutes('*');
  }
}
