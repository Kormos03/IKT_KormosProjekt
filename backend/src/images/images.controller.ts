import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as path from 'path';
import { diskStorage } from 'multer';

const multer = require('multer');


const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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
  createImageName(@UploadedFile() file) {
    this.imagesService.createImage(file);
    console.log(file);
    
  }
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}${ext}`);
      }
    })
    
  }
))

  
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



