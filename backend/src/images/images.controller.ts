import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  //This endpoint is for the frontend to create an image, admin only
  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  //This endpoint is for the frontend to get all images, admin only
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  //This endpoint is for the frontend to get an image by name, admin only
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.imagesService.findOne(name);
  }

  //This endpoint is for the frontend to update an image by name, admin only
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(name, updateImageDto);
  }

  //This endpoint is for the frontend to delete an image by name, admin only
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.imagesService.remove(name);
  }
}
