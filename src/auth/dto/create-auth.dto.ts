import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";
import { Role } from "../entities/role.enum";

export class CreateAuthDto {
    @IsNotEmpty({ message: "Please provide name" })
    @IsString()
    name: string;

    @IsNotEmpty({ message: "Please provide an Email" })
    @IsString({ message: "Email can not be only numbers" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Please provide a password" })
    @MinLength(8, { message: "password must contain minimum of 8 characters" })
    // prettier-ignore
    @MaxLength(32, { message: "password must contain maximum of 32 characters" })
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Weak Password",
    })
    password: string;

    @IsNotEmpty({ message: "Please provide a role" })
    @IsEnum(Role, { message: "Please choose between admin or user" })
    role: Role;
}
