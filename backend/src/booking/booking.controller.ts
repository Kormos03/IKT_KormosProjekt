import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  //For reserved table
  @Post('/reserved')
  createReserved(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createReserved(createBookingDto);
  }

  @Get('/reserved')
  findAllReserved() {
    return this.bookingService.findAllReserved(true);
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
  findAll(@Body() user: User) {
    if(user.admin == true){
    return this.bookingService.findAllNotReserved(true);
  }
  else{
    return "You are not authorized to see the bookings"
  }
  }

  @Get('bydate/:date')
  findAllByDate(@Param('date') date: string) {
    return this.bookingService.findAllByDate(date, false);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id, false);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, false);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id, false);
  }
}

