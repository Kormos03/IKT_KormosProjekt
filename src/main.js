"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
const helmet = require("helmet");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const cspConfig = JSON.parse(fs.readFileSync('./csp.json', 'utf8'));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
    app.use(helmet.ieNoOpen());
    app.use(helmet.dnsPrefetchControl());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'X-Requested-With'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', '..', 'frontend', 'dist'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    const docConfig = new swagger_1.DocumentBuilder()
        .setTitle('Nail salon API')
        .setDescription('Ez az API a körömstúdió backendjét szolgálja ki.')
        .setVersion('1.0')
        .addTag('nail salon')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, docConfig);
    swagger_1.SwaggerModule.setup('apidoc', app, document);
    app.setGlobalPrefix('api');
    app.use((req, res, next) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile((0, path_1.join)(__dirname, '..', '..', '..', 'frontend', 'dist', 'index.html'));
        }
        else {
            next();
        }
    });
    app.enableCors();
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map