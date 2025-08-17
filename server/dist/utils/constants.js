"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCORSConfig = exports.commentsCORSConfig = exports.blogsCORSConfig = exports.utils = void 0;
const common_1 = require("@nestjs/common");
exports.utils = {
    emailReqex: new RegExp(/[a-zA-Z0-9]{5,}@(gmail|outlook|yahoo).(com|tn|net)/, 'g'),
    verificationCodeValidity: 1 * 60 * 1000,
    maxOPTTrial: 3,
    allowedOrigins: [
        "http://localhost:5173"
    ],
    protectedRoutes: ['task', 'team', 'workspace', 'discussion', 'message', 'note', 'notification']
};
exports.blogsCORSConfig = [
    {
        path: 'blog',
        method: common_1.RequestMethod.POST
    }, {
        path: 'blog/*path',
        method: common_1.RequestMethod.PATCH
    }, {
        path: 'blog/*path',
        method: common_1.RequestMethod.PUT
    }, {
        path: 'blog/*path',
        method: common_1.RequestMethod.DELETE
    }
];
exports.commentsCORSConfig = [
    {
        path: 'comment/*path',
        method: common_1.RequestMethod.POST
    }, {
        path: 'comment/*path',
        method: common_1.RequestMethod.PATCH
    }, {
        path: 'comment/*path',
        method: common_1.RequestMethod.PUT
    }, {
        path: 'comment/*path',
        method: common_1.RequestMethod.DELETE
    }
];
exports.usersCORSConfig = [
    {
        path: 'user',
        method: common_1.RequestMethod.POST
    }, {
        path: 'user/*path',
        method: common_1.RequestMethod.GET
    }, {
        path: 'user/*path',
        method: common_1.RequestMethod.PATCH
    }, {
        path: 'user/*path',
        method: common_1.RequestMethod.PUT
    }, {
        path: 'user/*path',
        method: common_1.RequestMethod.DELETE
    }
];
//# sourceMappingURL=constants.js.map