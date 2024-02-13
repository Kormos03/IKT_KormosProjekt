import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }


  @Post('/reserved')
  createReserved(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createReserved(createBookingDto);
  }
  @Delete('/reserved/:id')
  removeReserved(@Param('id') id: string) {
    return this.bookingService.remove(+id, true);

  }
  @Patch('/reserved/:id')
  updateReserved(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, true);

  }
  @Get(':id')
  findOneReserved(@Param('id') id: string) {
    return this.bookingService.findOne(+id, true);
  }



  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }


  @Get()
  findAll() {
    return this.bookingService.findAll(false);
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

