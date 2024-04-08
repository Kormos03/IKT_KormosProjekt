import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet.frameguard({ action: 'deny' }));   //a module to prevent clickjacking

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const docConfig = new DocumentBuilder()
  .setTitle('Nail salon API')
  .setDescription('Ez az API a körömstúdió backendjét szolgálja ki.')
  .setVersion('1.0')
  .addTag('nail salon')
  .build();
const document = SwaggerModule.createDocument(app, docConfig);
SwaggerModule.setup('apidoc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
