import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UsersService } from 'src/users/users.service';
export declare class BookingController {
    private readonly bookingService;
    private readonly userService;
    constructor(bookingService: BookingService, userService: UsersService);
    createReserved(createBookingDto: CreateBookingDto): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
    findAllReserved(): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    removeReservedAdmin(id: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
    removeReserved(req: any): Promise<import(".prisma/client").Prisma.BatchPayload | {
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
    updateReserved(id: string, updateBookingDto: UpdateBookingDto): import(".prisma/client").Prisma.Prisma__Not_ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneReserved(req: any): import(".prisma/client").Prisma.Prisma__ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createBookingDto: CreateBookingDto): Promise<"Booking already exists" | "You are not authorized to create a booking">;
    findAll(): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    findAllByDate(date: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__Not_ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateBookingDto: UpdateBookingDto): import(".prisma/client").Prisma.Prisma__Not_ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
}
