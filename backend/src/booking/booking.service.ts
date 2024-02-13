import { Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) { }
  async create(createBookingDto: CreateBookingDto) {
    //A kapott intervallumot feldarabolom fél órákra
    const allNotReserved = this.prisma.not_Reserved.findMany();
    (await allNotReserved).forEach(async (data) => {
      let halfHours = 30 * 60 * 1000;
      const halfHour = 30 * 60 * 1000;
      while (data.dateEnd.getMilliseconds() != halfHours) {
        halfHours += 30 * 60 * 1000;
        this.prisma.not_Reserved.create({ data: { ...data, dateStart: new Date(data.dateStart.getHours() + halfHour), dateEnd: new Date(data.dateEnd.getTime() + halfHour) } })
      }
    });

  }
  /**
   * 
   * @param createBookingDto 
   * @returns 
   */
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

      const allNotReserved = this.prisma.not_Reserved.findMany();

      const rightDate = (await dateScheduleStart).map((data) => {
        if (data.dateEnd < datestart || data.dateEnd > datestart) {
          return data.dateEnd
        }
      })
      console.log(rightDate)
      console.log(await dateScheduleStart)
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






      return reserved;
    }
    catch (e) {
      return e;
    }
  }



  findAll(admin: boolean) {
    if (admin) {
      return this.prisma.reserved.findMany();
    }
    return this.prisma.not_Reserved.findMany();
  }



  findOne(id: number, reserved: boolean) {
    if (reserved) {
      return this.prisma.reserved.findUnique({
        where: { id: id },
      })
    } else {
      return this.prisma.not_Reserved.findUnique({
        where: { id: id },
      })
    }
  }



  update(id: number, updateBookingDto: UpdateBookingDto, reserved: boolean) {
    if (reserved) {
      return this.prisma.reserved.update({
        where: { id: id },
        data: updateBookingDto,
      })
    }
    else {
      return this.prisma.not_Reserved.update({
        where: { id: id },
        data: updateBookingDto,
      })
    }
  }



  remove(id: number, reserved: boolean) {
    if (reserved) {
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
