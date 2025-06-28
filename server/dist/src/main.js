"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            colors: true,
        }),
    });
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