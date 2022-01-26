import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
