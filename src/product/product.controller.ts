import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, ValidationPipe, BadGatewayException, Query, Req } from '@nestjs/common';
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
import { Bot, InlineKeyboard, InlineQueryResultBuilder } from 'grammy';


@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  async uploadFile(@Body() body: CreateProductDto) {
    try {
      return this.productService.add_product(body)
    } catch {

      throw new BadGatewayException()
    }
  }
  @Get()
  get_product(@Query("name") query: any) {
    console.log(query)
    return this.productService.get_product_by_game_name("")
  }
  @Post("webcallback")
  async send_product(@Body() { id }: { id: string }, @Req() req: any) {
    const bot = new Bot(process.env.BOT_TOKEN);
    var product = await this.productService.get_product_by_id(id)
    try {
      await bot.api.answerWebAppQuery(req.queryId, 
        {
          id: product.productId,
          type: 'article',
          title: product.Name,
          
          thumbnail_url: `https://1640350c0d13.vps.myjino.ru/images/image/${product.Image.imagePath}`,
          input_message_content: {
            message_text: `Вы выбрали товар: ${product.Name}\nстоимостью ${product.Value} руб`
          },
          reply_markup: InlineKeyboard.from([[{text: "Подтвердить заказ",callback_data: `p_${product.productId}`}]])
        }
      )
    } catch (e) {
      console.log(e)
      return { status: "Ошибка отправки" }
    }
    return { status: "Успешно отправлено" }
  }
}

