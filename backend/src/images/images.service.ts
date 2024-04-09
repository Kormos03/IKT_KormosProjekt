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
    const convertedName = createImageDto.name.toString();
    return this.db.images.create({
      data: {
        url: createImageDto.url,
        name: convertedName
      }
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

  remove(id: number) {
    return this.db.images.delete({
      where: {id}
    });
  }

 async createImage(createImageDto: CreateImageDto) {
 
    const lastImage = await this.getTheHighestName();
    return await lastImage;

  }
 //This function is helping the createImage function to get the highest name from the database and return the correct name
  async getTheHighestName(){ 
    let tempImagename = '';
      const lastImage = await this.db.images.findMany();
  await lastImage.map((image) => {
    tempImagename = image.name;
  });
  return (parseInt(tempImagename) + 1).toString();
  }
}

//This function is helping the createImage function to get the highest name from the database
