import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserDto } from './dtos/user.dto';
import { User } from './interfaces/user.interface';

@ApiTags('User')
@Controller('users')
export class UsersController implements OnModuleInit {
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
    async onModuleInit() {
        const requestPatters = [
            'find-all-user',
            'create-user'
        ];

        requestPatters.forEach(async pattern => {
            this.client.subscribeToResponseOf(pattern)
            await this.client.connect()
        })
    }

    @Get()
     list(): Observable<User[]> {
        return this.client.send('find-all-user', {})

    }

    @Post()
    @ApiBody({ type: UserDto })
     create(@Body() user: UserDto): Observable<User> {
        return  this.client.send('create-user', user)
    }
}
