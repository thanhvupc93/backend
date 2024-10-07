import { Module } from '@nestjs/common';
import { InventoryController } from './controller';
import { InventoryService } from './service';
import { Inventory } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
