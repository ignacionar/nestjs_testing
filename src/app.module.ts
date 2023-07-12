import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './product/product.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HelloMiddleware } from './middlewares/hello.middleware';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bull';
import { MessageService } from './message/message.service';
import { MessageConsumer } from './message/message.consumer';
import { MessageController } from './message/message.controller';

@Module({
  imports: [
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
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [AppService, MessageService, MessageConsumer],
  controllers: [AppController, MessageController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HelloMiddleware).forRoutes('*');
  }
}
