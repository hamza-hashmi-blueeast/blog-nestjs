import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './user.service';

@Module({
  imports:[
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
