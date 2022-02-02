import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";

import { map, Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";
import { User } from "src/user/models/user.interface";
import { hasRoles } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private reflector: Reflector,

      @Inject(forwardRef(() => UserService))
      private userService : UserService
      ) {}

      canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
    }

}