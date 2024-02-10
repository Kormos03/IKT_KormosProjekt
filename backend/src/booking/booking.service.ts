import { Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) { }
  create(createBookingDto: CreateBookingDto) {
    return this.prisma.not_Reserved.create({ data: createBookingDto });
  }

  findAll(admin: boolean) {
    if (admin == true) {
      return this.prisma.reserved.findMany();
    }
    return this.prisma.not_Reserved.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {

    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
