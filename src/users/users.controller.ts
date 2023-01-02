import { Controller, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    @Post()
    create(user:User): User {
        return 
    }
}
