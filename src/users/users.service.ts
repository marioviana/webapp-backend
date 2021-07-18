import { Injectable } from '@nestjs/common';
import * as User from '../../models/user';

@Injectable()
export class UsersService {
  findOne(email: string): Promise<User.User | undefined> {
    return User.getUserByEmail(email);
  }
}
