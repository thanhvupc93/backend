import { Module } from '@nestjs/common';
import { CategoryController } from './controller';
import { CategoryService } from './service';
import { Category } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
