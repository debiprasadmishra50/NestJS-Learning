import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;

    @IsString()
    description: string;

    @IsUUID("4")
    owner: string;

    @IsNumber()
    @IsOptional()
    duration?: number;
}
