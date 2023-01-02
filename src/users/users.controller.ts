import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    list(): User[] {
        return this.usersService.list()

    }

    @Post()
    @ApiBody({ type: UserDto})
    create(@Body() user:User): User {
        return this.usersService.create(user)
    }
}
