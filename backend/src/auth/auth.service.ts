import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
  constructor (private readonly db: PrismaService  ) {}
  
  async generateTokenFor(user: User, loggedIn: boolean) {
    let expiration = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day in milliseconds
    if(loggedIn){
      expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days in milliseconds
    }
    const randomBuffer = randomBytes(32);
    const randomString = randomBuffer.toString('hex');

    this.sendMail(user.email, 'Token', randomString);
    await this.db.token.create({
      data: {
        token: randomString,
        userId: user.id,
        expiration: expiration
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

async tokenCleanup() {
  await this.db.token.deleteMany({
    where: {
      expiration: {
        lt: new Date()
      }
    }
  })  
}

async sendMail(emailTo: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kitty12@ethereal.email',
        pass: '7dwhh2Z8qcPWAbJma9'
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: subject,
    text: text,
    html: '<b>Hello world?</b>',
  };

  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
}
}
