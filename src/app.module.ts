import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { Color } from './color/color.entity';
import { Size } from './size/size.entity';
import { Inventory } from './inventory/entity';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';
import { OrderItems } from './order-items/order_items.entity';
import { OrderItemsModule } from './order-items/order_items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('database');
        return {
          type: config['TYPE'],
          host: config['HOST'],
          port: config['PORT'],
          username: config['USERNAME'],
          password: config['PASSWORD'],
          database: config['DATABASE'],
          entities: [
            User,
            Category,
            Product,
            Color,
            Size,
            Inventory,
            Order,
            OrderItems,
          ],
          synchronize: true,
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ProductModule,
    CategoryModule,
    UsersModule,
    AuthModule,
    OrderModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
