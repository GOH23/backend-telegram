import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { Product } from 'src/product/entities/product.entity';
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), MulterModule.register({
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
  }), ],
  exports: [ImageService],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
