import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

async function hashPassword(password: string){
  try {
    const hash = await argon2.hash(password);
  
    return hash;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email}
    })
  }
  create(createUserDto: CreateUserDto) {
   
  }

  async registration(createUserDto: CreateUserDto) {
    try {
      const user = await this.findByEmail(createUserDto.email);
      if (user) {
        throw new HttpException('Ez az email cím már foglalt!', HttpStatus.BAD_REQUEST);
      }
    
    const hashedPassword = await hashPassword(createUserDto.password);
    return this.db.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        admin: false,
      }
    })
  }catch (err) {
    console.log(err.message)
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }} 

  findAll() {
    return `This action returns all users`;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {email: updateUserDto.email},
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
      }
    })
  }
}
