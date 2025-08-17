import { RequestMethod } from "@nestjs/common";
export declare const utils: {
    emailReqex: RegExp;
    verificationCodeValidity: number;
    maxOPTTrial: number;
    allowedOrigins: string[];
    protectedRoutes: string[];
};
export declare const blogsCORSConfig: {
    path: string;
    method: RequestMethod;
}[];
export declare const commentsCORSConfig: {
    path: string;
    method: RequestMethod;
}[];
export declare const usersCORSConfig: {
    path: string;
    method: RequestMethod;
}[];
