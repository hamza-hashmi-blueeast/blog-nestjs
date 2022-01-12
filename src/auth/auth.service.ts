import { Observable, from, of } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
import { userInfo } from 'os';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly JwtService : JwtService){}

    generateJWT(user : User):Observable <string>{
        return from(this.JwtService.signAsync(user))
    }

    hashPassword(password:string):Observable <string>{
        return from<string>(bcrypt.hash(password,12))
    }

    comparePassword(newPassword:string, passwordHash: string):Observable <any | boolean>{
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash))
    }
}
