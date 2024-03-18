import { Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma.service';


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
        console.log("Hour: " + hour)
        let minute = time.split(":")[1];
        console.log("Minute: " + minute)
        console.log('Time: '+time)
        console.log("Hour: " + hour)
        console.log("Minute: " + minute)
        let start = parseDate(createBookingDto.dateStart);
        start.setHours(Number(hour), Number(minute), 0, 0);
        console.log("StartDate: " + start)
        let end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        if (isNaN(start.getTime())) {  // start.getTime() will be NaN if start is not a valid date
          console.error('Invalid start date');
          return;
        }
        
        return this.prisma.not_Reserved.create({
          data: {
            name: createBookingDto.name,
            dateStart: start,
            dateEnd: end,
            type: createBookingDto.type,
            extra: createBookingDto.extra,
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
  async createReserved(createBookingDto: CreateBookingDto) {
    console.log("CreateBookingDto dates: " + createBookingDto.dateStart + " - " + createBookingDto.dateEnd)
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
      //Lekérdezem az elérhető időintervallumokat
      const not_ReservedAll = this.prisma.not_Reserved.findMany({
        where: {
          AND: [
            { dateStart: { gte: new Date(createBookingDto.dateStart) } },
            { dateEnd: { lte: new Date(createBookingDto.dateEnd) } },
          ]
        }
      });

      //Ellenőrzések!
      //Megnézem, hogy az összes slot benne van-e az időintervallumban
      console.log("Az összes slot ami benne van az időintervallumban foglaláskor: \n");
      console.log(await not_ReservedAll);

      for (let i = 0; i < halfHourSlots.length; i++) {
        console.log("HalfHourSlots: " + halfHourSlots[i].dateStart + " - " + halfHourSlots[i].dateEnd)
      }
      console.log("HalfhourSlots.length: " + halfHourSlots.length)
      if (((await not_ReservedAll).length) < halfHourSlots.length) {
        throw new Error("The date is not available in the available time intervals.");
      }
      //Ellenőrízni, hogy létezik-e már a megadott időpont foglaláls a reserved táblába


      /*
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

      await this.prisma.not_Reserved.deleteMany({
        where: { dateStart: datestart },
      });*/
      //Kitörlöm a not_Reserved táblából azokat az időintervallumokat, amiket a reserved táblába foglalok(nem műkszik)
      /*
    const deletedCount = await this.prisma.not_Reserved.count({
      where: {
        AND: [
          { dateStart: { gte: new Date(createBookingDto.dateStart) } },
          { dateEnd: { lte: new Date(createBookingDto.dateEnd) } },
        ],
      },
    });
    console.log("Deletecount: " + deletedCount)

    if (deletedCount < halfHourSlots.length) {
      throw new Error("The date is not available in the available time intervals.");
    }
*/
      const deleted = this.prisma.not_Reserved.deleteMany({
        where: {
          AND: [

            { dateStart: { gte: new Date(createBookingDto.dateStart) } },
            { dateEnd: new Date(createBookingDto.dateEnd) },
            { dateStart: new Date(createBookingDto.dateStart) },
            { dateEnd: { lte: new Date(createBookingDto.dateEnd) } },
          ],
        }
      });
      console.log("A törölt időintervallumok: \n");
      console.log(await deleted);



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



  findAll(admin: boolean) {
    if (admin) {
      return this.prisma.reserved.findMany();
    }
    return this.prisma.not_Reserved.findMany();
  }



  findOne(id: number, reserved: boolean) {
    if(id==null){return;}
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


  findAllByDate(date: string, reserved: boolean) {
    if (reserved) {
      return this.prisma.reserved.findMany({
        where: {
          AND: [
            { dateStart: { gte: new Date(date) } },
            { dateEnd: { lte: new Date(date) } },
          ],
        },
      })
    }
    else {
      return this.prisma.not_Reserved.findMany({
        where: {
          AND: [
            { dateStart: { gte: new Date(date) } },
            { dateEnd: { lte: new Date(date) } },
          ],
        },
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


function generateHalfHourSlots(dateStart: Date, dateEnd: Date): string[] {
  const halfHourSlots: string[] = [];
  let currentTime = new Date(dateStart);

  while (currentTime < dateEnd) {
    halfHourSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Add 30 minutes

  }
  console.log("generateHalfHourSlots halfHourSlots: " + halfHourSlots)
  return halfHourSlots;
}

