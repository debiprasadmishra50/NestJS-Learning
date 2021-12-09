import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString({ message: "Please provide a string" })
    @IsOptional()
    firstName: string;

    @IsString()
    @IsNotEmpty({ message: "Please provide a lastname" })
    lastName: string;

    @IsNotEmpty({ message: "Please provide an email" })
    @IsEmail({ message: "Please provide a valid email" })
    @IsString()
    email: string;
}
