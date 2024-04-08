import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, NotContains, contains } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail({}, { message: 'Nem megfelelő email formátum!'})
  @Length(1, 255)
  @ApiProperty({
    description: 'Email cím',
    example: 'someone@email.com'
})
  email: string;
 
 
  @IsString()
  @Length(1, 255) 
  @ApiProperty({
    description: 'Jelszó',
    example: 'test'
})
  password: string;
}

