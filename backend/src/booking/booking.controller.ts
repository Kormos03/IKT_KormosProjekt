import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
  //I don't use admin for authentication, I use the bearer token only
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  //For reserved table
  @Post('/reserved')
  @UseGuards(AuthGuard('bearer'))
  createReserved(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createReserved(createBookingDto);
  }

  @Get('/reserved')
  @UseGuards(AuthGuard('bearer')) 
  findAllReserved() {
    return this.bookingService.findAllReserved();
  }
  @Delete('/reserved/:id')
  removeReserved(@Param('id') id: string) {
    return this.bookingService.remove(+id, true);

  }
  @Patch('/reserved/:id')
  updateReserved(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, true);

  }
  @Get('/reserved/:id')
  findOneReserved(@Param('id') id: string) {
    return this.bookingService.findOne(+id, true);
  }

  

  //For not_reserved table
  @Post()
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createBookingDto: CreateBookingDto) {
    if(createBookingDto.admin == true){
    return this.bookingService.create(createBookingDto);
  }
  else{
    return "You are not authorized to create a booking"
  }
  }


  @Get("/not_reserved/")
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return this.bookingService.findAllNotReserved();
  }

  @Get('bydate/:date')
  findAllByDate(@Param('date') date: string) {
    return this.bookingService.findAllByDate(date, false);
  }

  @Get('/not_reserved/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id, false);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, false);
  }


  @Delete('/not_reserved/:id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id, false);
  }
}

