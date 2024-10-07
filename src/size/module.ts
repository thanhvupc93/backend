import { Module } from '@nestjs/common';
import { SizeController } from './controller';
import { SizeService } from './service';
import { Size } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
