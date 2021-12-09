// import { SetMetadata } from '@nestjs/common';

// export const GetUser = (...args: string[]) => SetMetadata('get-user', args);

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entities/user.entity";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
