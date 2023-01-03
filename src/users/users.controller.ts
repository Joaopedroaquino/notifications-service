import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'user',
                brokers: ['localhost:9092']
            },
            consumer: {
                groupId: 'user-consumer',
                allowAutoTopicCreation: true
            }
        }
     
    })
    private client: ClientKafka;
    constructor(private usersService: UsersService) { }

    @Get()
    async list(): Promise<UserEntity[]> {
        return this.usersService.list()

    }

    @Post()
    @ApiBody({ type: UserDto })
    async create(@Body() user: UserDto): Promise<UserEntity> {
        return await this.usersService.create(user)
    }
}
