import { Controller, Post, Body, UseGuards, Req, Get, UseFilters, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { HttpExceptionFilter } from "../customer/filters/httpexception.filter";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signup(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.signup(createAuthDto);
    }

    /* 
        Passport Auth
    */
    // @Post("login")
    // @UseGuards(LocalAuthGuard)
    // async loginPassportLocal(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    //     const user = req.user;
    //     const token = await this.authService.signToken(user);

    //     res.cookie("jwt", token, {
    //         // secure: req.headers["x-forwarded-proto"] === "https" || true,
    //         httpOnly: true,
    //         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90days
    //     });

    //     res.status(201).json({
    //         user,
    //         token,
    //     });
    // }

    /* 
        Jwt Auth
    */
    @Post("login")
    async loginJwt(@Body() loginAuthDto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
        const { user, token } = await this.authService.loginJwt(loginAuthDto);

        res.cookie("jwt", token, {
            // secure: req.headers["x-forwarded-proto"] === "https" || true,
            httpOnly: true,
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90days
        });

        res.status(201).json({
            user,
            token,
        });
    }

    @Get("logout")
    async logout(@Res() res: Response) {
        res.cookie("jwt", "loggedout", {
            expires: new Date(Date.now() + 10 * 1000), // 10 secs
            httpOnly: true,
        });

        res.status(200).json({
            status: "success",
        });
    }
}
