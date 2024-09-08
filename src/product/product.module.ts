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

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MulterModule.register({
    storage: diskStorage({
      destination(req, file, callback) {
        const UploadPath = `./public/`

        if (!existsSync(UploadPath)) {
          mkdirSync(UploadPath);
        }
        callback(null, UploadPath)
      },
      filename(req, file, callback) {

        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return callback(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
    fileFilter(req, file, callback) {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        callback(null, true);
      else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
      }
    },
  }), GamesModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
