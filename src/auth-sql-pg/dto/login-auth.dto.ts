import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateAuthDto } from "./create-auth.dto";

export class LoginAuthDto extends PartialType(CreateAuthDto) {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
