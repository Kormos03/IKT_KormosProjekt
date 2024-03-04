import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { BookingModule } from './booking/booking.module';
import { ImagesModule } from './images/images.module';
import { AppService } from './app.service';
import { PublicModule } from './PublicModule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BookingModule,
    ImagesModule, 
  PublicModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
