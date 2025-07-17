"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
exports.utils = {
    emailReqex: new RegExp(/[a-zA-Z0-9]{5,}@(gmail|outlook|yahoo).(com|tn|net)/, 'g'),
    verificationCodeValidity: 1 * 60 * 1000,
};
//# sourceMappingURL=constants.js.map