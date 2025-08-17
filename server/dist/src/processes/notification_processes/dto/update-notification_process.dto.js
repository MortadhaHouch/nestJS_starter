"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationProcessDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_notification_process_dto_1 = require("./create-notification_process.dto");
class UpdateNotificationProcessDto extends (0, mapped_types_1.PartialType)(create_notification_process_dto_1.CreateNotificationProcessDto) {
    id;
}
exports.UpdateNotificationProcessDto = UpdateNotificationProcessDto;
//# sourceMappingURL=update-notification_process.dto.js.map