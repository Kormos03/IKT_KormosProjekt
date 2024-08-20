import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { GLOBAL_API_URL } from 'GLOBAL_API_URL';
  //http://localhost:3000/images/0.jpeg the db before
  //http://localhost:3000/images/1.jpeg
const API_URL = GLOBAL_API_URL + '/images/';

@Injectable()
export class ImagesService {
 constructor( private readonly db : PrismaService) {}
 
  create(createImageDto: any, typeofnail: string) {
    if (!createImageDto.url) {
      createImageDto.url = API_URL + createImageDto.originalname;
    }
    console.log('CreateImageDto:', createImageDto);
    //The name of the image is provided with the .jpeg extension, so we need to remove it to save it to the database
    const correctname = createImageDto.originalname.split(".")[0];
    //The image is saved to the database
    return this.db.images.create({
      data: {
        url: createImageDto.url,
        name: correctname,  
        type: typeofnail
      }
    });
  }

  findAll() {
    return this.db.images.findMany();
  }

  findOne(Ogid: string) {
const id = parseInt(Ogid)
    return this.db.images.findFirst({
      where: {id}
    });
  }

  update(id: any, updateImageDto: UpdateImageDto) {
    return this.db.images.update({
      where: {id},
      data: updateImageDto
    });
  }

  remove(Ogid: string) {
    const id = parseInt(Ogid)
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
    let tempImagename;
      const lastImage = await this.db.images.findMany();
  await lastImage.map((image) => {
    tempImagename = image.name;
  });
  const correctName = parseInt(tempImagename) + 1;
  return (correctName);
  }
}

//This function is helping the createImage function to get the highest name from the database
