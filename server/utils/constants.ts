export const utils = {
  emailReqex: new RegExp(
    /[a-zA-Z0-9]{5,}@(gmail|outlook|yahoo).(com|tn|net)/,
    'g',
  ),
  verificationCodeValidity: 1 * 60 * 1000,
};
