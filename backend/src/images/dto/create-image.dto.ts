import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateImageDto {

    @IsNumber()
    @ApiProperty({
        description: 'A kép azonosítója',
        example: '20'
    })
    id: number;

    @IsNotEmpty({ message: 'A kép URL-jének megadása kötelező' })
    @ApiProperty({
        description: 'A kép URL-je, ami a szerver oldalon található lokálisan vagy a cloud-ban',
        example: 'http://localhost:3000/images/nailimg.jpg'
    })
    url: string;

    @IsNotEmpty({ message: 'A kép nevének megadása kötelező' })
    @ApiProperty({
        description: 'A kép neve, ugyanis erre a névre lehet rákeresni a frontend oldalon',
        example: 'nailimg.jpg'
    })
    name: string;  

}