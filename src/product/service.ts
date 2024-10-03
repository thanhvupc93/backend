import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/Product';
import { products } from './data'

@Injectable()
export class ProductService {
  private readonly products: Product[] = products;

  create(product: Product) {
    this.products.push(product);
  }

  findAll(): Product[] {
    return this.products;
  }
}
