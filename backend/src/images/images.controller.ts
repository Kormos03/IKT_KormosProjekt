import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.imagesService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(name, updateImageDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.imagesService.remove(name);
  }
}
