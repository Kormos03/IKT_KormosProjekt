import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImagesService {
 constructor( private readonly db : PrismaService) {}
 
  create(createImageDto: any) {
    //If the url is not provided, then the url will be the localhost url
    if (!createImageDto.url) {
      createImageDto.url = "http://localhost:3000/images/" + createImageDto.originalname;
    }
    //The name of the image is provided with the .jpeg extension, so we need to remove it to save it to the database
    const correctname = createImageDto.originalname.split(".")[0];
    //The image is saved to the database
    return this.db.images.create({
      data: {
        url: createImageDto.url,
        name: correctname,
        type: createImageDto.type
      }
    });
  }

  findAll() {
    return this.db.images.findMany();
  }

  findOne(id) {
    return this.db.images.findFirst({
      where: {id}
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

 async createImageName(createImageDto: CreateImageDto) {

    const lastImage = await this.getTheHighestName();
    let thecorrectname = '';
   if(await isNaN(lastImage)){
    thecorrectname = "0.jpeg";
   } 
   else{
    thecorrectname = await lastImage + ".jpeg";
   }
    return await thecorrectname.toString();

  }
 //This function is helping the createImage function to get the highest name from the database and return the correct name
  async getTheHighestName(){ 
    let tempImagename = '';
      const lastImage = await this.db.images.findMany();
  await lastImage.map((image) => {
    tempImagename = image.name;
  });
  return (parseInt(tempImagename) + 1);
  }
}

//This function is helping the createImage function to get the highest name from the database
