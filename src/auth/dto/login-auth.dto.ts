import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty } from "class-validator";
import { CreateAuthDto } from "./create-auth.dto";

export class LoginAuthDto extends PartialType(CreateAuthDto) {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
