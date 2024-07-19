import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UsersService } from 'src/users/users.service';
export declare class BookingController {
    private readonly bookingService;
    private readonly userService;
    constructor(bookingService: BookingService, userService: UsersService);
    createReserved(createBookingDto: CreateBookingDto): Promise<any>;
    findAllReserved(): Promise<any>;
    removeReservedAdmin(id: string): Promise<any>;
    removeReserved(req: any): Promise<any>;
    updateReserved(id: string, updateBookingDto: UpdateBookingDto): any;
    findOneReserved(req: any): any;
    create(createBookingDto: CreateBookingDto): Promise<"Booking already exists" | "You are not authorized to create a booking">;
    findAll(): Promise<any>;
    findAllByDate(date: string): any;
    findOne(id: string): any;
    update(id: string, updateBookingDto: UpdateBookingDto): any;
    remove(id: string): Promise<any>;
}
