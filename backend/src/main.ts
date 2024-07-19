import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import  { join } from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

const cspConfig = JSON.parse(fs.readFileSync('./csp.json', 'utf8'));

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet.frameguard({ action: 'deny' }));   //a module to prevent clickjacking
  app.use(helmet.xssFilter());  //a module to prevent cross-site scripting attacks
  app.use(helmet.noSniff());  //a module to prevent browsers from trying to guess (“sniff”) the MIME type
  app.use(helmet.hidePoweredBy());  //a module to remove the X-Powered-By header
  app.use(helmet.hsts({maxAge: 31536000, includeSubDomains: true}));  //a module to set the Strict-Transport-Security header
  app.use(helmet.ieNoOpen());  //a module to set the X-Download-Options header
  app.use(helmet.dnsPrefetchControl());  //a module to control browser DNS prefetching
  app.use(helmet.contentSecurityPolicy({directives: cspConfig}) as any);  //a module to set the Content-Security-Policy header
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  //I had to change the static path to the public folder because the images were not displayed
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'frontend', 'dist'));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));

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

  //await app.listen(process.env.PORT || 3000);
  await app.listen(3000, '0.0.0.0'); // Bind to all network interfaces

}
bootstrap();
