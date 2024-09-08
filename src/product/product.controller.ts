import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, ValidationPipe, BadGatewayException, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync, } from 'fs';
import { extname } from 'path';
import { diskStorage, MulterError } from 'multer';
import { CreateProductDto } from './dto/createproduct.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { UseRoles } from 'src/roles/roles.decorator';
import { Roles } from 'src/user/entities/user.entity';
import { GamesService } from 'src/games/games.service';
import { unlink } from 'fs/promises';


@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: CreateProductDto) {
    try{
      return this.productService.add_product(body,file.path)
    }catch{
      
      throw new BadGatewayException()
    }
  }
  @Get()
  get_product(@Query('name') name: string){

    return this.productService.get_product_by_game_name(name)
  }
}

