import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createproduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Games } from 'src/games/entities/game.entity';
import { GamesService } from 'src/games/games.service';
import { unlink } from 'fs';


@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>, private readonly gameService: GamesService) { }
    async add_product({ Name, Value, TypeName }: CreateProductDto, path: string) {
        const product = new Product();
        product.Name = Name
        product.Type = await this.gameService.find_by_name(TypeName)
        product.ImagePath = path
        product.Value = Value
        return this.productRepository.save(product);
    }
    async get_product_by_game_name(Name: string) {
        return this.productRepository.findBy({
            Type: { gameName: Name }
        })
    }
}
