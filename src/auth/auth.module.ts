import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guards';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async (configService:ConfigService) => ({
        secret : configService.get('JWT_SECRET'),
        signOptions :{ expiresIn: "100s"}
      })
    })
  ],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
  exports : [AuthService]
})
export class AuthModule {}
