import { IsBoolean, IsDate, IsDefined, IsNotEmpty, MinDate } from "class-validator";

export class CreateBookingDto {
    id: number;
    @IsNotEmpty({ message: 'A név megadása kötelező' })
    @IsDefined()
    name: string;


    dateStart: Date;

    @IsNotEmpty({ message: 'A befejező dátum megadása kötelező' })
    // @IsDate({ message: 'A befejező dátum formátuma nem megfelelő' })
    // @MinDate(new Date(), { message: 'A befejező dátum nem lehet kisebb a jelenlegi dátumnál' })
    dateEnd: Date;

    type: string;

    @IsBoolean()
    extra: boolean;
}
