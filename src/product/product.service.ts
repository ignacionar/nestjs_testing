import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getProduct(id: number): Promise<string> {
    // check if data is in cache:
    const cachedData = await this.cacheService.get('product:' + id.toString());

    if (cachedData) {
      console.log(`Getting data from cache!`);
      return await `${cachedData}`;
    }

    // if not, call API and set the cache:
    const { data } = await this.httpService.axiosRef.get(
      `https://dummyjson.com/products/${id}`,
    );

    // Default: 5s expiration
    await this.cacheService.set('product:' + id.toString(), data.title, 6000);

    return await `${data.title}`;
  }
}