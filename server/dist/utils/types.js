"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatus = exports.WorkSpaceStatus = exports.TaskPriority = exports.Role = exports.TaskStatus = void 0;
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
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "LOW";
    TaskPriority["MEDIUM"] = "MEDIUM";
    TaskPriority["HIGH"] = "HIGH";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["PENDING"] = "PENDING";
    RequestStatus["APPROVED"] = "APPROVED";
    RequestStatus["REJECTED"] = "REJECTED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
var WorkSpaceStatus;
(function (WorkSpaceStatus) {
    WorkSpaceStatus["ACTIVE"] = "ACTIVE";
    WorkSpaceStatus["INACTIVE"] = "INACTIVE";
    WorkSpaceStatus["DELETED"] = "DELETED";
})(WorkSpaceStatus || (exports.WorkSpaceStatus = WorkSpaceStatus = {}));
//# sourceMappingURL=types.js.map