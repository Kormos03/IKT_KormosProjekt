import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService, 
  )
 {}

  @Get('me')
  @UseGuards(AuthGuard('bearer'))
  me(@Request() req) {
    const user: User = req.user;
    return {
      email: user.email,
      name: user.name,
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
      name: user.name,
      admin: user.admin,
    }
  }

  @Post('/regist')
 async create(@Body() createUserDto: CreateUserDto) {
  try {
    const generatedUser = await this.usersService.registration(createUserDto);
    return {
      token: await this.authService.generateTokenFor(generatedUser)
    }
} catch (error) {
    console.log(error);
    throw new UnauthorizedException(error.message);
}

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
