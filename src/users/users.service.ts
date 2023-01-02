import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [];
    create(user: User): User {
        this.users.push(user)
        return user
    }

    list(): User[] {
        return this.users
    }
}
