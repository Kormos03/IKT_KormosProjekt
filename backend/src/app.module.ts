import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { BookingModule } from './booking/booking.module';
import { ImagesModule } from './images/images.module';
import { AppService } from './app.service';
import { PublicModule } from './PublicModule';

@Module({
  imports: [BookingModule,
    ImagesModule, 
  PublicModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
