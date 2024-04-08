import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as path from 'path';
import { diskStorage } from 'multer';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  //This endpoint is for the frontend to create an image, admin only
  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  //This endpoint is for the frontend to upload an image to the server, admin only
  @Post('fileupload')
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${fileName}${extension}`)
      }
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, // limit to 100MB
  }))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      url: `http://localhost:3000/images/${file.filename}`
    };
  }

  //This endpoint is for the frontend to get all images
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  //This endpoint is for the frontend to get an image by name, admin only
  @Get(':name')
  @UseGuards(AuthGuard('bearer'))
  findOne(@Param('name') name: string) {
    return this.imagesService.findOne(name);
  }

  //This endpoint is for the frontend to update an image by name, admin only
  @Patch(':name')
  @UseGuards(AuthGuard('bearer'))
  update(@Param('name') name: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(name, updateImageDto);
  }

  //This endpoint is for the frontend to delete an image by name, admin only
  @Delete(':id')
  @UseGuards(AuthGuard('bearer'))
  remove(@Param('id') id: string) {
    
    const parsedId = parseInt(id);
    return this.imagesService.remove(parsedId);
  }
}



