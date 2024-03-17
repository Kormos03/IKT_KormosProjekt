import { IsEmail, IsString, Length, NotContains, contains } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  @Length(1, 255)
  @NotContains("'", { message: 'Nem tartalmazhat a mező aposztrófot!'})
  email: string;
 
 
  @IsString()
  //@Length(1, 255) 
  password: string;
}

