import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./auth/get-user.decorator";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { User } from "./auth/entities/user.entity";

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
    // @UseGuards(AuthGuard("local"))
    // @Post("auth/login")
    // async login(@Request() req) {
    //     return req.user;
    // }

    // Get Logged in user profile data
    @Get("users/me")
    // async getProfile(@Request() req) {
    async getProfile(@GetUser() user: User) {
        // return req.user;
        user.password = undefined;
        return user;
    }
}
