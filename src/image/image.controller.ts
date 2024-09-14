import { BadGatewayException, Body, Controller, Delete, Get, Param, Post, Req, Response, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UseRoles } from 'src/roles/roles.decorator';
import { Roles } from 'src/user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from 'src/product/dto/createproduct.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('images')
@UseGuards(AuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) { }
  @Post()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.SaveImage(file.path)
  }
  @Delete()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  async deleteFile(@Body() {ImagePath}: {ImagePath: string}) {
    return this.imageService.DeleteImageFromPath(ImagePath)
  }
  @Get()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  getAll() {
    return this.imageService.getAllImages();
  }
  @Get("image/:name")
  getFile(@Param("name") name: string, @Response() res: any) {

    return res.sendFile(join(process.cwd(), 'public', name));
  }


}
