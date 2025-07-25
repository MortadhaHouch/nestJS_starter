"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const mongoose_1 = require("@nestjs/mongoose");
const blog_entity_1 = require("./entities/blog.entity");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Blog',
                    schema: blog_entity_1.BlogSchema
                }
            ])
        ]
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map