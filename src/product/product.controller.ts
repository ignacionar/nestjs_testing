import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Param, Get, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseInterceptors(CacheInterceptor) // Auto cache response
  @CacheTTL(30) // Override TTL to 30s 
  // @CacheKey('custom-key')
  @Get('/:id')
  async getProduct(@Param('id') id: number): Promise<string> {
    return await this.service.getProduct(+id);
  }
}
