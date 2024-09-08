import { Controller, Get, Param, Req, Response, StreamableFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}



  @Get(":name")
  getFile(@Param("name") name: string,@Response() res: any) {
   
    return res.sendFile(join(process.cwd(), 'public',name));
  }


}
