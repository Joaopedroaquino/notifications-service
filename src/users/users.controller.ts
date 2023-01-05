import { Body, Controller, Delete, Get, OnModuleInit, Param, Patch, Post, Put } from '@nestjs/common';
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
            'find-user'
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

    @Get(':id')
     find(@Param('id') id: number): Observable<User> {
        return this.client.send('find-user', {id})

    }

    @Post()
    @ApiBody({ type: UserDto })
     create(@Body() user: UserDto) {
        return  this.client.emit('create-user', user)
    }

    @Put(':id')
    @ApiBody({ type: UserDto })
     update(@Body() {name, email, phone, password},  @Param('id') id:number) {
        const payload = {id, name, email, phone, password}
        return  this.client.emit('update-user', payload)

    }

    @Delete(':id')
    remove(@Param('id') id: number) {
       return this.client.send('delete-user', {id})

   }

   @Patch(':id/activate')
   activate(@Param('id')id: number){
    return this.client.emit('activate-user', {id})
   }

   @Patch(':id/inactivate')
   inactivate(@Param('id')id: number){
    return this.client.emit('inactivate-user', {id})
   }

 

}
