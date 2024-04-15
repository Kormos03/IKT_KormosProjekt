import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { error } from 'console';
import { UsersService } from 'src/users/users.service';
  //I don't use admin for authentication, I use the bearer token only
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly userService: UsersService
  ) { }

  //For reserved table
  //This endpoint is for the frontend to create a booking in the reserved table
  @Post('/reserved')
  @UseGuards(AuthGuard('bearer'))
  createReserved(@Body() createBookingDto: CreateBookingDto) {
    console.log(createBookingDto);
    if(createBookingDto.type.trim() == "" || createBookingDto.dateStart.trim() == "" || createBookingDto.dateEnd.trim() == "")
      {
        throw new error("Nem választottál típust vagy időpontot!");
      }
    return this.bookingService.createReserved(createBookingDto);
  }

  //This endpoint is for the frontend to get the available times from the reserved table
  @Get('/reserved')
  @UseGuards(AuthGuard('bearer')) 
  findAllReserved() {
    return this.bookingService.findAllReserved();
  }
  //This endpoint is for the frontend to delete a booking from the reserved table
  @Delete('/reserved/:id')
  removeReserved(@Param('id') id: string) {
    return this.bookingService.remove(+id, true);

  }
  //This endpoint is for the frontend to update a booking in the reserved table
  @Patch('/reserved/:id')
  updateReserved(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, true);

  }

  //This endpoint is for the frontend to get the available time from the reserved table by ID
  @Get('/reserved/getone')
  @UseGuards(AuthGuard('bearer')) 
  findOneReserved(@Request() req) {
      const user: User = req.user;
    return this.bookingService.findOneReserved(user.username);
  }

  

  //For not_reserved table
  //This endpoint is for the frontend to create a booking in the not_reserved table
  @Post()
  @UseGuards(AuthGuard('bearer'))
 async create(@Body() createBookingDto: CreateBookingDto) {
    if(createBookingDto.admin == true){
    const result = this.bookingService.create(createBookingDto);
    if(await result == "Booking already exists"){
      return "Booking already exists"
    }
  }
  else{
    return "You are not authorized to create a booking"
  }
  }

  //This endpoint is for the frontend to get the available times from the not_reserved table
  @Get("/not_reserved/")
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return this.bookingService.findAllNotReserved();
  }


  //This endpoint is for the frontend to get the available times for a given date
  @Post('/not_reserved/bydate/')
  @UseGuards(AuthGuard('bearer'))
  findAllByDate(@Body('date') date: string) {
    return this.bookingService.findAllByDateNotReserved(date);
  }

  //This endpoint is for the frontend to get the available times by ID from the not_reserved table
  @Get('/not_reserved/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  //This endpoint is for the frontend to update a booking in the not_reserved table
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto, false);
  }

  //This endpoint is for the frontend to delete a booking from the not_reserved table
  @Delete('/not_reserved/:id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id, false);
  }
}

