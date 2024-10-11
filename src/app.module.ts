import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { ImageModule } from './image/image.module';
import { GamesModule } from './games/games.module';
import { ProductModule } from './product/product.module';
import { Games } from './games/entities/game.entity';
import { Product } from './product/entities/product.entity';
import { Image } from './image/entities/image.entity';
import { TelegramApiModule } from './telegram_api/telegram_api.module';




@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot({
    type: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    entities: [User, Games, Product, Image],
    synchronize: true
  }), AuthModule, UserModule, ImageModule, GamesModule, ProductModule, TelegramApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
