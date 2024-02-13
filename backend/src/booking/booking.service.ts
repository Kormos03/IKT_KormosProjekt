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

  async createReserved(createBookingDto: CreateBookingDto) {
    try {

      const datestart = new Date(createBookingDto.dateStart);
      const dateScheduleStart = this.prisma.not_Reserved.findMany({
        where: {
          AND: [
            { dateStart: { gte: datestart } },
          ]
        }
      })
      const rightDate = (await dateScheduleStart).map((data) => {
        if (data.dateEnd < datestart || data.dateEnd > datestart) {
          return data.dateEnd
        }
      })
      console.log(rightDate)
      await this.prisma.not_Reserved.deleteMany({
        where: { dateStart: datestart },
      });

      const reserved = this.prisma.reserved.create({ data: createBookingDto });
      const createSlotsToNotReserve = this.prisma.reserved.create({
        data: {
          name: createBookingDto.name,
          dateStart: datestart,
          dateEnd: new Date(createBookingDto.dateEnd),
          type: createBookingDto.type,
          extra: createBookingDto.extra,
        },
      });
      return this.prisma.reserved.create({ data: createBookingDto });
    }
    catch (e) {
      return e;
    }
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

  remove(id: number, reserved: boolean) {
    if (reserved == true) {
      return this.prisma.reserved.delete({
        where: { id: id },
      })
    }
    else {
      return this.prisma.not_Reserved.delete({
        where: { id: id },
      });
    }
  }
}
