import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/module';
import { CategoryModule } from './category/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity';
import { UsersModule } from './user/module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Category } from './category/entity';
import { Product } from './product/entity';
import { Color } from './color/entity';
import { Size } from './size/entity';
import { Inventory } from './inventory/entity';
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
          entities: [User, Category, Product, Color, Size, Inventory],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
