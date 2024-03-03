import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImagesService {
 constructor( private readonly db : PrismaService) {}
  create(createImageDto: CreateImageDto) {
    if (!createImageDto.url) {
      createImageDto.url = "http://localhost:3000/images/" + createImageDto.name;
    }
    return this.db.images.create({
      data: createImageDto
    });
  }

  findAll() {
    return this.db.images.findMany();
  }

  findOne(name: string) {
    return this.db.images.findFirst({
      where: {name}
    });
  }

  update(name: string, updateImageDto: UpdateImageDto) {
    return this.db.images.update({
      where: {name},
      data: updateImageDto
    });
  }

  remove(name: string) {
    return this.db.images.delete({
      where: {name}
    });
  }
}
