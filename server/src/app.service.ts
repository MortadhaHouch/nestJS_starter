import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getHello() {
    return { message: 'hello' };
  }
}
