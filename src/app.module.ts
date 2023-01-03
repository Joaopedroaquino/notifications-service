import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule,
   TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
   DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
