import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { GamesService } from 'src/games/games.service';
import { GamesModule } from 'src/games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),GamesModule,ImageModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
