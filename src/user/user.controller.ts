import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Req,
    HttpCode,
    Header,
    Redirect,
    Res,
    HttpStatus,
    UseFilters,
    UsePipes,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Request, Response } from "express";
import { HttpExceptionFilter } from "./filters/httpexception.filter";
import { JoiValidationPipe } from "./pipes/validation.pipe";
import { createUserSchema } from "./entities/user.schema";
import { ValidationPipe } from "./pipes/class-validation.pipe";
import { AuthGuard } from "./guards/auth.guard";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";

@Controller("users")
@UseInterceptors(LoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    // @UsePipes(new JoiValidationPipe(createUserSchema))
    // create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): User {
    create(@Body() createUserDto: CreateUserDto): User {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): User[] {
        return this.userService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @UseFilters(HttpExceptionFilter)
    findOne(@Param("id", new ParseUUIDPipe()) id: string, @Req() req: Request): User {
        // console.log(req);

        return this.userService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): User {
        return this.userService.update(id, updateUserDto);
    }

    // @HttpCode(204)
    // @Header("", "")
    // @Redirect()
    @Delete(":id")
    remove(@Param("id", new ParseUUIDPipe()) id: string, @Res() res: Response): void {
        const user = this.userService.remove(id);

        res.status(HttpStatus.FOUND).json({
            status: "success",
            data: user,
        });
    }
}
