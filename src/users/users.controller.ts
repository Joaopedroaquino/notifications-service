import { Body, Controller, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post()
    create(@Body() user:User): User {
        return this.usersService.create(user)
    }
}
