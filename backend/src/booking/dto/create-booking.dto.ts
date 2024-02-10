import { IsBoolean, IsDate, IsDefined, IsNotEmpty, MinDate } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty({ message: 'A név megadása kötelező' })
    @IsDefined()
    name: string;


    dateStart: string;

    @IsNotEmpty({ message: 'A befejező dátum megadása kötelező' })
    // @IsDate({ message: 'A befejező dátum formátuma nem megfelelő' })
    // @MinDate(new Date(), { message: 'A befejező dátum nem lehet kisebb a jelenlegi dátumnál' })
    dateEnd: string;

    type: string;

    @IsBoolean()
    extra: boolean;
}
