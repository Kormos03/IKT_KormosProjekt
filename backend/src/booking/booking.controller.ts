import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UsersService
  ) {}

  @Post('/reserved')
  @UseGuards(AuthGuard('bearer'))
  createReserved(@Body() createBookingDto: CreateBookingDto) {
    if (!createBookingDto.type.trim() || !createBookingDto.dateStart.trim() || !createBookingDto.dateEnd.trim()) {
      throw new Error("Nem választottál típust vagy időpontot!");
    }
    return this.bookingService.createReserved(createBookingDto);
  }

  @Get('/reserved')
  @UseGuards(AuthGuard('bearer')) 
  findAllReserved() {
    return this.bookingService.findAllReserved();
  }

  @Delete('/reserved/id/:id')
  @UseGuards(AuthGuard('bearer')) 
  removeReservedAdmin(@Param('id') id: string) {
    console.log(id);
    return this.bookingService.removeReserved('',+id);
  }

  @Delete('/reserved/delete')
  @UseGuards(AuthGuard('bearer')) 
  removeReserved(@Request() req) {
    const user: User = req.user;
    console.log(user.name);
    return this.bookingService.removeReserved(user.name);
  }


  @Patch('/reserved/:id')
  updateReserved(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, true);
  }

  @Get('/reserved/getone')
  @UseGuards(AuthGuard('bearer')) 
  findOneReserved(@Request() req) {
    const user: User = req.user;
    return this.bookingService.findOneReserved(user.name);
  }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  async create(@Body() createBookingDto: CreateBookingDto) {
    console.log("Reservation is happening")
    if (createBookingDto.admin) {
      const result = await this.bookingService.create(createBookingDto);
      if (result === "Booking already exists") {
        return "Booking already exists";
      }
    } else {
      return "You are not authorized to create a booking";
    }
  }

  @Get("/not_reserved/")
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return this.bookingService.findAllNotReserved();
  }

  @Post('/not_reserved/bydate/')
  @UseGuards(AuthGuard('bearer'))
  findAllByDate(@Body('date') date: string) {
    return this.bookingService.findAllByDateNotReserved(date);
  }

  @Get('/not_reserved/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, false);
  }

  @Delete('/not_reserved/:id')
  remove(@Param('id') id: string) {
    return this.bookingService.removeNotReserved(+id);
  }
}