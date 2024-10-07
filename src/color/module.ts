import { Module } from '@nestjs/common';
import { ColorController } from './controller';
import { ColorService } from './service';
import { Color } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
