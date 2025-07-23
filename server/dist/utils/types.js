"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatus = exports.WorkSpaceStatus = exports.TaskPriority = exports.Role = exports.TaskStatus = exports.ProcessName = exports.NotificationType = void 0;
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
var NotificationType;
(function (NotificationType) {
    NotificationType["TASK"] = "TASK";
    NotificationType["REQUEST"] = "REQUEST";
    NotificationType["WORKSPACE"] = "WORKSPACE";
    NotificationType["SOCIAL_MEDIA"] = "SOCIAL_MEDIA";
    NotificationType["ALL"] = "ALL";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var ProcessName;
(function (ProcessName) {
    ProcessName["TASK"] = "TASK";
    ProcessName["REQUEST"] = "REQUEST";
    ProcessName["WORKSPACE"] = "WORKSPACE";
    ProcessName["SOCIAL_MEDIA"] = "SOCIAL_MEDIA";
    ProcessName["ALL"] = "ALL";
    ProcessName["GMAIL"] = "GMAIL";
})(ProcessName || (exports.ProcessName = ProcessName = {}));
//# sourceMappingURL=types.js.map