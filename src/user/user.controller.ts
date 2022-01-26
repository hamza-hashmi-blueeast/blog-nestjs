import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService) { }

    @Post()
    create(@Body()user: User ):Observable<User | object>{
        return this.userService.create(user).pipe(
            map((user : User)=>user),
            catchError(err => of({error : err.message }))
        )
    }

    @Post()
    login(@Body() user:User):Observable<Object>{
        return this.userService.login(user).pipe(
            map((jwt:string)=>{
                return {accesstoken: jwt}
            })
        )
    }

    @Get(':id')
    findOne(@Param() Param ):Observable<User>{
        return this.userService.findOne(Param.id)
    }

    @hasRoles('Admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll():Observable<User[]>{
        return this.userService.findAll()
    }

    @Delete(':id')
    deleteOne(@Param('id') id:string):Observable<any>{
        return this.userService.deleteOne(Number(id))
    }

    @Put(':id')
    UpdateOne(@Param('id') id:string, @Body() user:User):Observable<any>{
        return this.userService.updateOne(Number(id), user)    
    }
    

}
