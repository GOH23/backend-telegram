import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createproduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Games } from 'src/games/entities/game.entity';
import { GamesService } from 'src/games/games.service';
import { unlink } from 'fs';
import { ImageService } from 'src/image/image.service';


@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private readonly gameService: GamesService,
        private readonly imageService: ImageService) { }
    async add_product({ Name, Value, TypeName, ImagePath }: CreateProductDto) {
        const product = new Product();
        product.Name = Name
        product.Type = await this.gameService.find_by_name(TypeName)
        product.Image = await this.imageService.getImageFromPath(ImagePath)
        product.Value = Value
        return this.productRepository.save(product);
    }
    async get_product_by_game_name(Name: string) {


        return this.productRepository.find({
            where: {
                Type: { gameName: Name },
                Blocked: false,
            },relations: {Type: true,Image: true}
        })
    }
    async get_product_by_id(id: string) {
        return this.productRepository.findOneBy({
            productId: id,
            Blocked: false
        })
    }
}
