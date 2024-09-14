import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { unlink } from 'fs';

@Injectable()
export class ImageService {
    /**
     *
     */
    constructor(@InjectRepository(Image) private readonly ImageRepository: Repository<Image>) { }
    async SaveImage(imagePath: string){
        return this.ImageRepository.save({
            imagePath: imagePath
        })
    }
    async getImageFromPath(path: string ){
        return this.ImageRepository.findOneBy({
            imagePath: path
        })
    }
    async getAllImages(){
        return this.ImageRepository.find()
    }
    async DeleteImageFromPath(path: string ){
        unlink(path,(err)=>{
            console.log(err)
        })
        return this.ImageRepository.delete({
            imagePath: path
        })
    }
}
