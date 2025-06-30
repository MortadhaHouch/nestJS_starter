"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            colors: true,
            timestamp: true,
        }),
    });
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || '',
            retryAttempts: 5,
            retryDelay: 3000,
        },
    });
    await app.startAllMicroservices();
    app.enableCors([
        {
            origins: ['http://localhost:5173'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            enableCredentials: true,
        },
    ]);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map