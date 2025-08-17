/* eslint-disable prettier/prettier */
import { RequestMethod } from "@nestjs/common";

export const utils = {
  emailReqex: new RegExp(
    /[a-zA-Z0-9]{5,}@(gmail|outlook|yahoo).(com|tn|net)/,
    'g',
  ),
  verificationCodeValidity: 1 * 60 * 1000,
  maxOPTTrial: 3,
  allowedOrigins:[
    "http://localhost:5173"
  ],
  protectedRoutes:['task','team','workspace','discussion','message','note','notification']
};
export const blogsCORSConfig = [
  {
    path: 'blog',
    method: RequestMethod.POST
  },{
    path: 'blog/*path',
    method: RequestMethod.PATCH
  },{
    path: 'blog/*path',
    method: RequestMethod.PUT
  },{
    path: 'blog/*path',
    method: RequestMethod.DELETE
  }
]
export const commentsCORSConfig = [
  {
    path: 'comment/*path',
    method: RequestMethod.POST
  },{
    path: 'comment/*path',
    method: RequestMethod.PATCH
  },{
    path: 'comment/*path',
    method: RequestMethod.PUT
  },{
    path: 'comment/*path',
    method: RequestMethod.DELETE
  }
]
export const usersCORSConfig = [
  {
    path: 'user',
    method: RequestMethod.POST
  },{
    path: 'user/*path',
    method: RequestMethod.GET
  },{
    path: 'user/*path',
    method: RequestMethod.PATCH
  },{
    path: 'user/*path',
    method: RequestMethod.PUT
  },{
    path: 'user/*path',
    method: RequestMethod.DELETE
  }
]
