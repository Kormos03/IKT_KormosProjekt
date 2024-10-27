import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';
export declare class BookingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBookingDto: CreateBookingDto): Promise<string>;
    createReserved(createBookingDto: CreateBookingDto): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
    findAllNotReserved(): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    findAllReserved(): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__Not_ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findOneReserved(name: string): import(".prisma/client").Prisma.Prisma__ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByDateNotReserved(date: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }[]>;
    update(id: number, updateBookingDto: UpdateBookingDto, reserved: boolean): import(".prisma/client").Prisma.Prisma__Not_ReservedClient<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    removeReserved(name: string, id?: number): Promise<import(".prisma/client").Prisma.BatchPayload | {
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
    removeNotReserved(id: number): Promise<{
        name: string;
        type: string;
        id: number;
        dateStart: Date;
        dateEnd: Date;
        extra: boolean;
    }>;
}
