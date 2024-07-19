import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString, Length, NotContains, contains } from "class-validator";

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

  @IsBoolean({ message: 'A loggedIn mező csak boolean típus lehet!'})
  @ApiProperty({
    description: 'Be marad-e jelentkezve a felhasználó 1 hónapig, ellenkező esetben 1 napig',
    example: 'true'
})
  rememberMe: boolean;
}

