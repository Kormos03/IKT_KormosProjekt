import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import * as path from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { EventEmitter } from 'events';
import { writeFileSync } from 'fs';
import { join } from 'path';

class FileUploadEmitter extends EventEmitter {}

const fileUploadEmitter = new FileUploadEmitter();


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
  constructor(private imagesService: ImagesService) {}

  //This endpoint is for the frontend to create an image, admin only
  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }


  //This endpoint is for the frontend to upload an image to the server, and the database admin only
  @Post('fileupload')
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(FileInterceptor('file')) // 'file' should match the name you used in formData.append() in your client-side code
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    const filename  = this.imagesService.createImageName(file.originalname);

      const fileforsave = file
      fileforsave.originalname = await filename
      console.log('file after name change:', await fileforsave);
      const savePath = path.join(__dirname, '..','..', 'public', 'images', fileforsave.originalname);
      writeFileSync(savePath, file.buffer);

      console.log(`File saved at ${savePath}`);
      
      return this.imagesService.create(fileforsave);
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

 /* async renameFile(file) {
    const correctName = await this.imagesService.createImage(file);
    const ext = path.extname(file.originalname);
    const oldPath = path.join('./public/images', file.originalname);
    const newPath = path.join('./public/images', `${correctName}${ext}`);
    fs.rename(oldPath, newPath, err => {
      if (err) throw err;
    });
  }*/
}



