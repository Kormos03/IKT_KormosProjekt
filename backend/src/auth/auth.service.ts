import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class AuthService {
  constructor (private readonly db: PrismaService) {}

  async generateTokenFor(user: User) {
    const randomBuffer = randomBytes(32);
    const randomString = randomBuffer.toString('hex');

    await this.db.token.create({
      data: {
        token: randomString,
        userId: user.id,
      }
    })

    return randomString;
  }

  async generateTokenForAdmin(user: User) {
    if(!user.admin){
      throw new Error('Nincs jogosultságod ehhez a művelethez!');
    }
    const randomBuffer = randomBytes(32);
    const randomString = randomBuffer.toString('hex');

    await this.db.adminToken.create({
      data: {
        token: randomString,
        userId: user.id,
      }
    })

    return randomString;
  }

  async findUserByToken(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token }
    })
    if (tokenObj == null) {
      return null;
    }
    return await this.db.user.findUniqueOrThrow({
      where: { id: tokenObj.userId }
    })
  }
}
