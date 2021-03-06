import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/user.service";


@Injectable()
export class UserIsUserGuard implements CanActivate{

    constructor(
        @Inject(forwardRef(()=>UserService))
        private userService : UserService
    ){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const Param = request.Param;
        const user : User = request.user.user;
        
        return this.userService.findOne(user.id).pipe(
            map((user:User)=>{
                let hasPermission = false;

                if(user.id === Number(Param.id)){
                    hasPermission = true
                }
                return user && hasPermission
            })
        ) 

        
    }
}