import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class FilterTaskDto {
    @IsBoolean()
    @IsOptional()
    @Transform((value) => value.value === "true")
    completed?: boolean;
}
