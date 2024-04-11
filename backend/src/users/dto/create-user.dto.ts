import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Az email cím megadása kötelező' })
    @IsEmail({}, { message: 'Az email cím formátuma nem megfelelő' })
    @ApiProperty({
        description: 'Az email cím a felhasználó azonosítására szolgál',
        example: 'someone@email.com'
    })
    email: string;

    @IsNotEmpty({ message: 'A felhasználónév megadása kötelező' })
    @ApiProperty({
        description: 'A felhasználó neve, amely a foglaláskor megjelenik az adminnak',
        example: 'someone@email.com'
    })
    name: string;

    @IsNotEmpty({ message: 'A jelszó megadása kötelező' })
    @ApiProperty({
        description: 'A jelszó, amely a felhasználó azonosítására szolgál',
        example: 'test'
    })
    password: string;

    @ApiProperty({
        description: 'Az admin jogosultság megadása',
        example: 'true'
    })
    admin: boolean;
}
