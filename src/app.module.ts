import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductModule } from './product/product.module';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ProductModule,
  ],
})
export class AppModule {}
