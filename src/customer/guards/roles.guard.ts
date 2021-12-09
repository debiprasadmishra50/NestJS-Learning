// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Observable } from "rxjs";

// @Injectable()
// export class RolesGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         return true;
//     }
// }

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../auth/entities/role.enum";
import { ROLES_KEY } from "../roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        // return requiredRoles.some((role) => user.roles?.includes(role));
        // return requiredRoles === user.role;
        if (requiredRoles === user.role) {
            return true;
        }

        throw new ForbiddenException("You are not authorized to access this resource");
    }
}
