import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { CreateStudentDto } from "./create-student.dto";

export class StudentFilterDto extends PartialType(CreateStudentDto) {
    @IsOptional()
    name?: string;
}
