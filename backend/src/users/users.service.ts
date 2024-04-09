import { Injectable } from '@nestjs/common';
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
    const hashedPassword = await hashPassword(createUserDto.password);
    return this.db.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.name,
        password: hashedPassword,
      }
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {email: updateUserDto.email},
      data: {
        username: updateUserDto.name,
        email: updateUserDto.email,
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
