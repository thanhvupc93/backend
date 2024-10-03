import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/Category';
import { categories } from './data'

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = categories;

  create(category: Category) {
    this.categories.push(category);
  }

  findAll(): Category[] {
    return this.categories;
  }
}
