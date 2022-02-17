import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable, map, switchMap } from "rxjs";

import { BlogEntry } from "../model/blog.interface";
import { BlogService } from "../blog.service";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserIsAuthorGuard implements CanActivate{

    constructor(
        private userService : UserService,
        private blogService : BlogService){}

        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();

            const params = request.params;
            const blogEntryId : number = Number(params.id)
            const user : User = request.user;

            return this.userService.findOne(user.id).pipe(
                switchMap((user:User)=>
                    this.blogService.findOne(blogEntryId).pipe(
                        map((blogEntry:BlogEntry)=>{
                            let hasPermission = false
                            if(user.id === blogEntry.author.id)(
                                hasPermission = true
                            )
                            return user && hasPermission
                        })
                    )
                )
            )
        }
}