import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request: any): boolean | Promise<boolean> | Observable<boolean> {
        // perform validation logic
        // roles validation
        // token validation
        return true;
        // return false; // will give ForbiddenException
    }
}
