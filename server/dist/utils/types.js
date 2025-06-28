"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["DONE"] = "DONE";
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["OVERDUE"] = "OVERDUE";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));
//# sourceMappingURL=types.js.map