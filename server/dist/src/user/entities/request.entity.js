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
exports.FriendRequestSchema = exports.FriendRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const types_1 = require("../../../utils/types");
let FriendRequest = class FriendRequest {
    sender;
    receiver;
    status;
};
exports.FriendRequest = FriendRequest;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], FriendRequest.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], FriendRequest.prototype, "receiver", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.keys(types_1.RequestStatus).map(k => k.toString()), default: types_1.RequestStatus.PENDING.toString(), type: String }),
    __metadata("design:type", String)
], FriendRequest.prototype, "status", void 0);
exports.FriendRequest = FriendRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], FriendRequest);
exports.FriendRequestSchema = mongoose_1.SchemaFactory.createForClass(FriendRequest);
//# sourceMappingURL=request.entity.js.map