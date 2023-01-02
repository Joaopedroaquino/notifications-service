import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './database/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>){}

    async  create(user: User): Promise <UserEntity> {
       
        return  await this.userRepository.save(user)
    }

  async  list(): Promise <UserEntity[]> {
        return await this.userRepository.find()
    }
}
