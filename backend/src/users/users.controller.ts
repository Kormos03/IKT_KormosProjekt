import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;
    return {
      email: user.email,
      name: user.username,
      admin: user.admin,
    }
  }

  @Get('adminMe')
  @UseGuards(AuthGuard('bearer'))
  adminMe(@Request() req) {
    const user: User = req.user;
    
    if (!user.admin) {
      throw new Error('Nincs jogosultságod ehhez a művelethez!');
    }
    return {
      email: user.email,
      name: user.username,
      admin: user.admin,
    }
  }

  @Post('/regist')
  @UseGuards(AuthGuard('bearer'))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registration(createUserDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() req) {
    const user: User = req.user;
    if (user && !user.admin) {
      throw new ForbiddenException();
    }
    // Ezt a függvényt csak admin jogosultságú user tudja meghívni
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
