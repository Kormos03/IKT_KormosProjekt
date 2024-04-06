import { Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';
import { removeIfPresent } from 'typedoc/dist/lib/utils';


function parseDate(dateString: string): Date {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute));

}

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) { }
  async create(createBookingDto: CreateBookingDto) {
    try {
      //A kapott intervallumot feldarabolom fél órákra
      const halfHourSlots = generateHalfHourSlots(new Date(createBookingDto.dateStart), new Date(createBookingDto.dateEnd));
      //A feldarabolt intervallumokat beillesztem a not_Reserved táblába
      const notReserved = await Promise.all(halfHourSlots.map(async (time) => {
        let hour = time.split(":")[0];
        let minute = time.split(":")[1];
        let start = new Date(createBookingDto.dateStart);

        start.setHours(Number(hour), Number(minute), 0, 0);

        let end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        //We need to convert the date to ISO string to store it in the database, because this is the right format for the Prisma ORM
        const intoTheTableStart = start.toISOString();
        const intoTheTableEnd = end.toISOString();
        return this.prisma.not_Reserved.create({
          data: {
            name: createBookingDto.name,
            dateStart: intoTheTableStart,
            dateEnd: intoTheTableEnd,
            extra: createBookingDto.extra,
            type: '',
          },
        });
      }));
    } catch (e) { throw new Error(e) }
  }

  /**
   * 
   * @param createBookingDto 
   * @returns 
   */

  //This function is for the frontend that the user can create a reservation
  async createReserved(createBookingDto: CreateBookingDto) {
    try {
      const halfHourSlotsArray = generateHalfHourSlots(new Date(createBookingDto.dateStart), new Date(createBookingDto.dateEnd));
      const halfHourSlots = halfHourSlotsArray.map((time) => {
        let hour = time.split(":")[0];
        let minute = time.split(":")[1];
        let start = parseDate(createBookingDto.dateStart);
        start.setHours(Number(hour), Number(minute), 0, 0);
        let end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        return { dateStart: start, dateEnd: end };
      }
      )
      halfHourSlots.forEach(async (element) => {
       console.log(element) });    
    
      //Delete the not reserved slots that are in the same time interval
      //First I need to find the slots that are in the same time interval
      //Then I have to itaretate through the array and delete the slots
      //With the remove function

      //I have to check if the date is in the right format
      if (createBookingDto.dateStart < createBookingDto.dateEnd || createBookingDto.dateStart == null || createBookingDto.dateEnd == null) {
        throw new Error("Date is null, or the start date is later than the end date!");
      }

      //Létrehozom a reserved táblában az időintervallumokat
      const reserved = this.prisma.reserved.create({ data: createBookingDto });
      const createSlotsToNotReserve = this.prisma.reserved.create({
        data: {
          name: createBookingDto.name,
          dateStart: new Date(createBookingDto.dateStart),
          dateEnd: new Date(createBookingDto.dateEnd),
          type: createBookingDto.type,
          extra: createBookingDto.extra,
        },
      });

      return reserved;
    }
    catch (e) {
      throw new Error(e);
    }
  }



  findAllNotReserved() {
    return this.prisma.not_Reserved.findMany();
  }
  
  findAllReserved() {
      return this.prisma.reserved.findMany();
  }



  findOne(id: number) {
    if(id==null){throw new Error("Id is null")};
      return this.prisma.not_Reserved.findUnique({
        where: { id: id },
      })
  }

  findOneReserved(id: number) {
    if(id==null){throw new Error("Id is null")};
      return this.prisma.reserved.findUnique({
        where: { id: id },
      })
  }

  //This function is for the frontend to get the available times for a given date
  findAllByDateNotReserved(date: string) {
    if(date==null){throw new Error("Date is null")};
    if(date.length != 10){throw new Error("Date is not in the right format")}
    const targetDate = new Date(date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);
    return this.prisma.not_Reserved.findMany({
        where: {
            AND: [
                { dateStart: { gte: targetDate   } },
                { dateEnd: { lt: nextDay } },
            ],
        },
    })
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
    console.log('id: ', id)
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


function generateHalfHourSlots(dateStart: Date, dateEnd: Date): string[] {
  const halfHourSlots: string[] = [];
  let currentTime = new Date(dateStart);

  while (currentTime < dateEnd) {
    halfHourSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false}));
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes

  }
  return halfHourSlots;
}
