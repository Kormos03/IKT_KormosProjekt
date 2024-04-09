import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDefined, IsNotEmpty, IsNumber, MinDate } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({
        description: 'Az admin jogosultság megadása',
        example: 'true'
    })
    admin: boolean;

    @ApiProperty({
        description: 'A foglalás azonosítója',
        example: '140'
    })
    id: number;

    @ApiProperty({
        description: 'A foglaló neve',
        example: 'Aron'
    })
    name: string;

    @ApiProperty({
        description: 'A kezdő dátum',
        example: '2022-01-01T00:00:00.000Z'
    })
    dateStart: string;

    @IsNotEmpty({ message: 'A befejező dátum megadása kötelező' })
    // @IsDate({ message: 'A befejező dátum formátuma nem megfelelő' })
    // @MinDate(new Date(), { message: 'A befejező dátum nem lehet kisebb a jelenlegi dátumnál' })
    @ApiProperty({
        description: 'A befejező dátum',
        example: '2022-01-01T10:00:00.000Z'
    })
    dateEnd: string;

    @ApiProperty({
        description: 'A foglalás típusa',
        example: 'műköröm'
    })
    type: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Extra igények megadása, pl körömre kövek felrakása',
        example: 'false'
    })
    extra: boolean;
}
