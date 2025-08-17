"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../utils/types");
let User = class User {
    _id;
    firstName;
    lastName;
    email;
    password;
    role;
    tasks;
    isLoggedIn;
    validationCode;
    latestLoginTrial;
    otpTrialCount;
    firstOPTTrial;
    ip;
    friends;
    notes;
    discussions;
    notifications;
    accessLevel;
    views;
    socialMediaLinks;
    website;
    birthDate;
    phoneNumber;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        message: 'First name must be at least 3 characters long',
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 3,
        message: 'Last name must be at least 3 characters long',
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 8,
        message: 'Email must be at least 8 characters long',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        minlength: 8,
        required: true,
        message: 'Password must be at least 8 characters long',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
        default: 'USER',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Task" }] }),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isLoggedIn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, required: false }),
    __metadata("design:type", Number)
], User.prototype, "validationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], User.prototype, "latestLoginTrial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], User.prototype, "otpTrialCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], User.prototype, "firstOPTTrial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "User" }], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Note" }], default: [], required: false }),
    __metadata("design:type", Array)
], User.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Discussion" }], default: [], required: false }),
    __metadata("design:type", Array)
], User.prototype, "discussions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Schema.Types.ObjectId, ref: "Notification" }], default: [], required: false }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: types_1.ProfileAccessLevel.PUBLIC, required: false }),
    __metadata("design:type", String)
], User.prototype, "accessLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                user: {
                    type: mongoose_2.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
            },
        ],
        default: [],
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "socialMediaLinks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: false }),
    __metadata("design:type", Number)
], User.prototype, "phoneNumber", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map