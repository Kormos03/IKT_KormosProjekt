import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';
export declare class BookingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBookingDto: CreateBookingDto): Promise<string>;
    createReserved(createBookingDto: CreateBookingDto): Promise<any>;
    findAllNotReserved(): Promise<any>;
    findAllReserved(): Promise<any>;
    findOne(id: number): any;
    findOneReserved(name: string): any;
    findAllByDateNotReserved(date: string): any;
    update(id: number, updateBookingDto: UpdateBookingDto, reserved: boolean): any;
    removeReserved(name: string, id?: number): Promise<any>;
    removeNotReserved(id: number): Promise<any>;
}
